//+------------------------------------------------------------------+
//|                                              FalconLikeEA.mq5    |
//|  FALCON-RX / MICRO-MEAN-REVERSION ENGINE — independent MT5 port  |
//|                                                                    |
//|  This EA is an INDEPENDENT implementation inspired only by the    |
//|  publicly documented behavior of a third-party product           |
//|  ("FalconTrader" by BLCKMGIC GmbH). It contains no proprietary    |
//|  source code, algorithm, or trade secret of that product.         |
//|                                                                    |
//|  CONFIRMED public parameters (docs.falcontrader.de, EN+DE,        |
//|  cross-checked 2026-09-22 — see /research/confirmed_facts.md):    |
//|    buy_percent               default 0.32%                       |
//|    trailing_buy_step         default 0.70%                       |
//|    trailing_buy_floor_buffer default 0.03%                       |
//|    sell_percent              default 0.55%                       |
//|    trailing_sell_step        default 0.70%                       |
//|    trailing_sell_floor_buffer default 0.03%                      |
//|    limit_price_offset        default 0.00%                       |
//|    "never sells below own purchase price" (no forced stop-loss)  |
//|                                                                    |
//|  ASSUMED (NOT publicly disclosed — see /research/unknowns.md):    |
//|    - Reference price = Simple Moving Average of Bid price,        |
//|      period configurable (default 20). Vendor confirms "a moving  |
//|      average" is used but not type/period/price-basis.            |
//|    - Trailing trigger = MODEL B from the working spec:             |
//|        buy_trigger  = max(buy_floor,  dip_low  * (1+trailing))    |
//|        sell_trigger = min(sell_ceil,? see below) — mirrored on    |
//|        the sell side using peak_high and a floor above the sell   |
//|        threshold. This is ONE of several candidate models; it is  |
//|        NOT confirmed to match the proprietary product.            |
//|    - Execution uses MARKET orders. Vendor does not disclose order |
//|      type for automated fills.                                    |
//|    - One position at a time, no averaging/martingale (baseline    |
//|      spec, Part 13).                                              |
//|                                                                    |
//|  MT5 vs. Bitvavo — DOCUMENTED DIFFERENCES (Part 28 requirement):  |
//|    - MT5 brokers typically offer BTC as a CFD (e.g. BTCUSD),      |
//|      not spot BTC/EUR settlement into a real wallet like Bitvavo. |
//|      Check your broker's actual symbol/contract spec.             |
//|    - MT5 tick data reflects broker-quoted bid/ask, NOT Bitvavo's  |
//|      own order book — the two price series will diverge.          |
//|    - Fee model differs: MT5/CFD brokers use spread + swap/        |
//|      commission, not Bitvavo's maker/taker fee schedule. The      |
//|      sell_percent default's "~0.5% fee" rationale (confirmed for  |
//|      Bitvavo) does NOT transfer as-is — recompute InpSellPercent  |
//|      for your broker's actual cost structure (Part 12 Module 7).  |
//|    - No public order-book / microstructure data available in     |
//|      standard MT5 — Part 10's order-book-based reference models   |
//|      are not portable here.                                       |
//|    - This EA is a behavioral analog for research/comparison       |
//|      purposes, NOT a claim of identical execution to the Python   |
//|      baseline or to the proprietary product.                      |
//+------------------------------------------------------------------+
#property copyright "FALCON-RX (independent project)"
#property link      ""
#property version   "0.10"
#property strict

#include <Trade\Trade.mqh>

//================================= INPUTS ===================================

input group "=== CONFIRMED public parameters (defaults from vendor docs) ==="
input double InpBuyPercent              = 0.32;   // buy_percent (%)
input double InpTrailingBuyStep         = 0.70;   // trailing_buy_step (%)
input double InpTrailingBuyFloorBuffer  = 0.03;   // trailing_buy_floor_buffer (%)
input double InpSellPercent             = 0.55;   // sell_percent (%)
input double InpTrailingSellStep        = 0.70;   // trailing_sell_step (%)
input double InpTrailingSellFloorBuffer = 0.03;   // trailing_sell_floor_buffer (%)
input double InpLimitPriceOffset        = 0.00;   // limit_price_offset (%) — ceiling above which no new buys arm

input group "=== ASSUMED — reference engine (not publicly disclosed) ==="
input int    InpReferenceMAPeriod       = 20;         // ASSUMED SMA period
input ENUM_MA_METHOD InpReferenceMAMethod = MODE_SMA;  // ASSUMED MA method
input ENUM_APPLIED_PRICE InpReferencePrice = PRICE_CLOSE; // ASSUMED applied price basis

input group "=== Position sizing / risk (baseline: no stop-loss, one position) ==="
input double InpFixedLots               = 0.01;   // fixed lot size per entry
input ulong  InpMagicNumber             = 20260922;
input bool   InpEnableOptionalSafetyStop = false;  // OFF by default — baseline has NO stop-loss
input double InpOptionalSafetyStopPercent = 0.0;   // only used if the above is true (experimental module, Part 14)

input group "=== Logging ==="
input bool   InpVerboseLogging          = true;

//================================= STATE ====================================

enum ENUM_FALCON_STATE
  {
   STATE_FLAT,            // watching, no dip tracked yet
   STATE_TRACKING_DIP,    // buy threshold breached, tracking deepest dip
   STATE_LONG,            // holding a position, watching for sell arm
   STATE_TRACKING_PEAK,   // sell threshold breached, tracking highest peak
   STATE_ERROR            // safety stop — manual intervention required
  };

ENUM_FALCON_STATE g_state = STATE_FLAT;

double g_dipLow      = 0.0;   // lowest price observed since STATE_TRACKING_DIP began
double g_peakHigh    = 0.0;   // highest price observed since STATE_TRACKING_PEAK began
double g_entryPrice  = 0.0;   // fill price of the open position
double g_refAtArm    = 0.0;   // reference price snapshot at the moment BUY_ARMED triggered

CTrade trade;
int    g_maHandle = INVALID_HANDLE;

//============================== UTILITIES ===================================

void FalconLog(const string reason, const string decision)
  {
   if(!InpVerboseLogging)
      return;
   PrintFormat("[FALCON-RX] %s | state=%s ref=%.2f price=%.2f dipLow=%.2f peakHigh=%.2f entry=%.2f | decision=%s | reason=%s",
               TimeToString(TimeCurrent(), TIME_DATE|TIME_SECONDS),
               EnumToString(g_state),
               GetReferencePrice(), SymbolInfoDouble(_Symbol, SYMBOL_BID),
               g_dipLow, g_peakHigh, g_entryPrice,
               decision, reason);
  }

double GetReferencePrice()
  {
   double buf[];
   if(g_maHandle == INVALID_HANDLE)
      return 0.0;
   if(CopyBuffer(g_maHandle, 0, 0, 1, buf) != 1)
      return 0.0;
   return buf[0];
  }

bool HasOpenPosition()
  {
   return PositionSelect(_Symbol) && PositionGetInteger(POSITION_MAGIC) == (long)InpMagicNumber;
  }

void ResetToFlat(const string reason)
  {
   g_state    = STATE_FLAT;
   g_dipLow   = 0.0;
   g_peakHigh = 0.0;
   g_refAtArm = 0.0;
   FalconLog(reason, "STATE -> FLAT");
  }

//================================= INIT ======================================

int OnInit()
  {
   g_maHandle = iMA(_Symbol, _Period, InpReferenceMAPeriod, 0, InpReferenceMAMethod, InpReferencePrice);
   if(g_maHandle == INVALID_HANDLE)
     {
      Print("[FALCON-RX] Failed to create reference MA handle. EA will not trade.");
      return(INIT_FAILED);
     }

   g_state = HasOpenPosition() ? STATE_LONG : STATE_FLAT;
   if(g_state == STATE_LONG)
      g_entryPrice = PositionGetDouble(POSITION_PRICE_OPEN);

   FalconLog("EA initialized", "OnInit complete");
   return(INIT_SUCCEEDED);
  }

void OnDeinit(const int reason)
  {
   if(g_maHandle != INVALID_HANDLE)
      IndicatorRelease(g_maHandle);
  }

//================================= TICK ======================================

void OnTick()
  {
   if(g_state == STATE_ERROR)
      return; // safety stop engaged — requires manual reset

   double reference = GetReferencePrice();
   if(reference <= 0.0)
      return; // MA not warmed up yet

   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   if(bid <= 0.0 || ask <= 0.0)
      return;

   switch(g_state)
     {
      case STATE_FLAT:          HandleFlat(reference, bid);          break;
      case STATE_TRACKING_DIP:  HandleTrackingDip(reference, bid);   break;
      case STATE_LONG:          HandleLong(bid);                     break;
      case STATE_TRACKING_PEAK: HandleTrackingPeak(bid);             break;
      default: break;
     }
  }

//============================ BUY-SIDE LOGIC =================================

void HandleFlat(const double reference, const double price)
  {
   double buyThreshold = reference * (1.0 - InpBuyPercent / 100.0);

   // ASSUMED: limit_price_offset caps how far ABOVE reference price is still allowed to arm.
   double ceiling = reference * (1.0 + InpLimitPriceOffset / 100.0);
   if(price > ceiling)
     {
      FalconLog("price above limit_price_offset ceiling", "WAIT (no arm)");
      return;
     }

   if(price <= buyThreshold)
     {
      g_state    = STATE_TRACKING_DIP;
      g_dipLow   = price;
      g_refAtArm = reference;
      FalconLog("price <= buyThreshold", "STATE -> TRACKING_DIP");
     }
  }

void HandleTrackingDip(const double reference, const double price)
  {
   if(price < g_dipLow)
      g_dipLow = price;

   double buyThreshold = g_refAtArm * (1.0 - InpBuyPercent / 100.0);
   // ASSUMED Model B: floor prevents the trailing trigger from sitting below (or too close to)
   // the original threshold on shallow dips — matches the documented PURPOSE of
   // trailing_buy_floor_buffer, formula itself is not vendor-confirmed.
   double buyFloor = buyThreshold * (1.0 + InpTrailingBuyFloorBuffer / 100.0);
   double trailingTrigger = MathMax(buyFloor, g_dipLow * (1.0 + InpTrailingBuyStep / 100.0));

   if(price >= trailingTrigger)
     {
      if(ExecuteBuy(price))
        {
         g_state = STATE_LONG;
         FalconLog("price >= trailingBuyTrigger, buy filled", "STATE -> LONG");
        }
      else
        {
         g_state = STATE_ERROR;
         FalconLog("buy order failed", "STATE -> ERROR (safety stop)");
        }
     }
   else
     {
      FalconLog("trailing recovery not yet confirmed", "WAIT");
     }
  }

bool ExecuteBuy(const double refPrice)
  {
   double lots = NormalizeLots(InpFixedLots);
   trade.SetExpertMagicNumber(InpMagicNumber);
   bool ok = trade.Buy(lots, _Symbol, 0.0, 0.0, 0.0, "FALCON-RX buy");
   if(ok && HasOpenPosition())
     {
      g_entryPrice = PositionGetDouble(POSITION_PRICE_OPEN);
      return true;
     }
   return false;
  }

//============================ SELL-SIDE LOGIC =================================

void HandleLong(const double price)
  {
   if(!HasOpenPosition())
     {
      // Position closed outside the EA (manual intervention) — resync, per Part 9 requirement
      // to detect and reconcile external state changes rather than silently desyncing.
      ResetToFlat("position closed externally — resynced");
      return;
     }

   if(InpEnableOptionalSafetyStop && InpOptionalSafetyStopPercent > 0.0)
     {
      double stopPrice = g_entryPrice * (1.0 - InpOptionalSafetyStopPercent / 100.0);
      if(price <= stopPrice)
        {
         // EXPERIMENTAL module (Part 13/14) — explicitly NOT part of the baseline, which never
         // force-sells at a loss. Off by default.
         ExecuteSell(price);
         ResetToFlat("optional safety stop triggered (experimental, non-baseline)");
         return;
        }
     }

   double sellThreshold = g_entryPrice * (1.0 + InpSellPercent / 100.0);
   if(price >= sellThreshold)
     {
      g_state = STATE_TRACKING_PEAK;
      g_peakHigh = price;
      FalconLog("price >= sellThreshold", "STATE -> TRACKING_PEAK");
     }
   else
     {
      FalconLog("below sellThreshold — baseline never force-sells at a loss", "WAIT");
     }
  }

void HandleTrackingPeak(const double price)
  {
   if(!HasOpenPosition())
     {
      ResetToFlat("position closed externally — resynced");
      return;
     }

   if(price > g_peakHigh)
      g_peakHigh = price;

   double sellThreshold = g_entryPrice * (1.0 + InpSellPercent / 100.0);
   // ASSUMED Model B mirrored on the sell side: floor keeps the trailing trigger from sitting
   // below the original sell threshold on shallow peaks.
   double sellFloor = sellThreshold * (1.0 + InpTrailingSellFloorBuffer / 100.0);
   double trailingTrigger = MathMax(sellFloor, g_peakHigh * (1.0 - InpTrailingSellStep / 100.0));

   if(price <= trailingTrigger)
     {
      if(ExecuteSell(price))
        {
         FalconLog("price <= trailingSellTrigger, sell filled", "STATE -> FLAT");
         ResetToFlat("position closed");
        }
      else
        {
         g_state = STATE_ERROR;
         FalconLog("sell order failed", "STATE -> ERROR (safety stop)");
        }
     }
   else
     {
      FalconLog("trailing peak not yet broken", "WAIT");
     }
  }

bool ExecuteSell(const double refPrice)
  {
   if(!HasOpenPosition())
      return false;
   double lots = PositionGetDouble(POSITION_VOLUME);
   trade.SetExpertMagicNumber(InpMagicNumber);
   return trade.Sell(lots, _Symbol, 0.0, 0.0, 0.0, "FALCON-RX sell");
  }

//================================ HELPERS ====================================

double NormalizeLots(const double lots)
  {
   double step = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);
   double minLot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MIN);
   double maxLot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MAX);
   double normalized = MathRound(lots / step) * step;
   return MathMax(minLot, MathMin(maxLot, normalized));
  }
//+------------------------------------------------------------------+
