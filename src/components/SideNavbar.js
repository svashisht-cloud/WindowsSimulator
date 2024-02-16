import "./sidebar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const SideNavbar = () => {
  const SideBarOptions = [
    {
      name: "Projects"
    },
    {
      name: "Experience"
    },
    {
      name: "Contact"
    },
    {
      name: "Resume"
    },
    {
      name: "About"
    }
  ];
  const [activePage, setActivePage] = useState("Home");
  return (
    <div className="sidebar">
      <Link className={activePage === "Home" ? "active" : ""} to="/" onClick={() => setActivePage("Home")}>
        Shubh Vashisht
      </Link>
      {SideBarOptions.map(ell => {
        return <Link to={`${ell.name}`} className={activePage === `${ell.name}` ? "active" : ""} onClick={() => setActivePage(`${ell.name}`)}>{ell.name}</Link>;
      })}
    </div>
  );
};

export default SideNavbar;
