import { BrowserRouter, Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { DerDieDas } from './pages/DerDieDas';
import { DieViele } from './pages/DieViele.tsx';
import { Words } from './pages/Words';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/der-die-das" element={<DerDieDas />} />
        <Route path="/die-viele" element={<DieViele />} />
        <Route path="/words" element={<Words />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
