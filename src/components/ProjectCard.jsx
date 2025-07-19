// src/components/ProjectCard.jsx

const ProjectCard = ({ project, isActive, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`relative flex-shrink-0 bg-white rounded-lg overflow-hidden transition-all duration-500 cursor-pointer
        ${isActive ? "w-full h-[340px] m-0" : "w-[170px] h-[220px] m-2"}
        shadow-xl`}
    >
      <img
        src={project.img}
        alt={project.title}
        className={`absolute bottom-0 w-full transition-all duration-500
          ${isActive ? "h-1/2 object-contain" : "h-auto"}`}
      />
      <div
        className={`absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-4 transition-all duration-500
          ${isActive ? "pb-24" : "pb-4"}`}
      >
        <h1 className="uppercase text-sm font-bold leading-tight">
          {project.title}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs ml-2"
            >
              <i className="fas fa-external-link-alt"></i>
            </a>
          )}
        </h1>
        {!isActive ? (
          <p className="mt-1 text-xs text-gray-300">{project.description}</p>
        ) : (
          <p className="mt-4 text-sm">{project.description}</p>
        )}
      </div>
    </li>
  );
};

export default ProjectCard;
