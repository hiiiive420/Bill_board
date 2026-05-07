import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <ScrollToLocation />
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin (Protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route
          path="/"
          element={<Home />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<Services />} />
 <Route
          path="/navbar"
          element={<Navbar />}
        />
        <Route path="/hero" element={<Hero />} />
        <Route
  path="/reset-password"
  element={<ResetPassword />}
/>
      </Routes>
    </BrowserRouter>
  );
}

function ScrollToLocation() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));

        if (target) {
          target.scrollIntoView({ block: "start" });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0 });
    });
  }, [pathname, hash]);

  return null;
}

export default App;
