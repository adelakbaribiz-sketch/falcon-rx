import { Route, Routes } from 'react-router-dom'
import { Shell } from './components/layout/Shell'
import { Overview } from './pages/Overview'
import { Research } from './pages/Research'
import { Strategy } from './pages/Strategy'
import { BacktestDemo } from './pages/BacktestDemo'
import { Docs } from './pages/Docs'

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Overview />} />
        <Route path="research" element={<Research />} />
        <Route path="strategy" element={<Strategy />} />
        <Route path="backtest" element={<BacktestDemo />} />
        <Route path="docs" element={<Docs />} />
      </Route>
    </Routes>
  )
}
