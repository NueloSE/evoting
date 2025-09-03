import Home from "./components/Home";
import Authpage from "./components/Authpage"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import "./index.css";

function App() {
  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authpage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
