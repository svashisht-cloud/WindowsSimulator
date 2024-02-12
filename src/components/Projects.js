import React, { useState, useEffect } from "react";
import projectsData from "../data/projects.json";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Set projectsData directly from the imported module
    setProjects(projectsData.projects);
  }, []);
  return (
    <div>
      <h2>Project List</h2>
      <table>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.github_link}</td>
              <td>{project.working_link}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
