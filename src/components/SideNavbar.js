import "./sidebar.css";
import { Link } from "react-router-dom";
import Experience from "./Experience";
const SideNavbar = () => {
  return (
    <div class="sidebar">
      <a class="active" href="#home">
        Home
      </a>
      <Link to="/project">Helo</Link>
      <a href="/projects">Projects</a>
      <a href="/experience">Experience</a>
      <a href="/contact">Contact</a>
      <a href="/resume">Download my Resume</a>
      <a href="/about">About Me</a>
    </div>
  );
};

export default SideNavbar;
