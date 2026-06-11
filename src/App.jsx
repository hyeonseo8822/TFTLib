import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Augments from './pages/Augments'
import CharacterPosition from './pages/CharacterPosition'
import Items from './pages/Items'
import Synergy from './pages/Synergy'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/synergies" element={<Synergy />} />
        <Route path="/augments" element={<Augments />} />
        <Route path="/positioning" element={<CharacterPosition />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
