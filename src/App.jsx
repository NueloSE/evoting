import Home from "./components/Home";
import Authpage from "./components/Authpage";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import useStore from "./server/store";
import Organizerdashboard from "./components/organizer/Organizerdashboard";

import "./index.css";

function App() {
  const initializeAuth = useStore((state) => state.initializeAuth);

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Authpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organizerdashboard" element={<Organizerdashboard />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
