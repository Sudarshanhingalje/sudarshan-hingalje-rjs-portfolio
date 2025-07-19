// src/components/ProjectCard.jsx
import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <li className="item">
      <img className="item-img" src={project.img} alt={project.title} />
      <div className="item-description">
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>
    </li>
  );
};

export default ProjectCard;
