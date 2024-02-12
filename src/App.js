import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import SideNavbar from "./components/SideNavbar";
import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="sidebar">
          <SideNavbar />
        </div>
        <div className="maincontent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
