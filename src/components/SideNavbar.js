import "./sidebar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const SideNavbar = () => {
  const [activePage, setActivePage] = useState("Home");
  return (
    <div className="sidebar">
      <Link className={activePage === "Home" ? "active" : ""} to="/" onClick={() => setActivePage("Home")}>
        Home
      </Link>
      <Link to="/projects" className={activePage === "Projects" ? "active" : ""} onClick={() => setActivePage("Projects")}>Projects</Link>
      <Link to="/experience" className={activePage === "Experience" ? "active" : ""} onClick={() => setActivePage("Experience")}>Experience</Link>
      <Link to="/contact" className={activePage === "Contact" ? "active" : ""} onClick={() => setActivePage("Contact")}>Contact</Link>
      <Link to="/resume" className={activePage === "Resume" ? "active" : ""} onClick={() => setActivePage("Resume")}>Download my Resume</Link>
      <Link to="/about" className={activePage === "About" ? "active" : ""} onClick={() => setActivePage("About")}>About Me</Link>
    </div>
  );
};

export default SideNavbar;
