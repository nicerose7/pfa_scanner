import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Scan from "./components/Scan";
import Result from "./components/Result";
import About from "./components/About";
import Navbar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/result" element={<Result />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

