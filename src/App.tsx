import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './components/Home';
import Templates from './components/Templates';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
