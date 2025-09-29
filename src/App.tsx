import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import Home from './components/Home';
import Templates from './components/Templates';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        }>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
