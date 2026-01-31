import { BrowserRouter, Routes, Route } from 'react-router'
import { Home } from './pages/Home'
import { DerDieDas } from './pages/DerDieDas'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/der-die-das" element={<DerDieDas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
