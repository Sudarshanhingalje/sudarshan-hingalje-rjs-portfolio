// src/components/ProjectCard.jsx

const ProjectCard = ({ project, isActive, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`relative flex-shrink-0 bg-white rounded-xl overflow-hidden transition-all duration-500 ease-in-out cursor-pointer
        ${isActive ? "w-full h-[340px] m-0" : "w-[170px] h-[220px] mx-2"}
        shadow-xl`}
    >
      <img
        src={project.img}
        alt={project.title}
        className={`absolute bottom-0 w-full object-cover transition-all duration-500 ease-in-out
          ${isActive ? "h-1/2" : "h-full"}`}
      />

      <div
        className={`absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-4 transition-all duration-500 ease-in-out
          ${isActive ? "pb-24" : "pb-4"}`}
      >
        <h1 className="uppercase text-sm font-bold leading-tight">
          {project.title}
        </h1>

        {!isActive ? (
          <p className="mt-1 text-xs text-gray-300">{project.description}</p>
        ) : (
          <>
            <p className="mt-4 text-sm">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs text-blue-300 underline"
            >
              Visit Project
            </a>
          </>
        )}
      </div>
    </li>
  );
};

export default ProjectCard;
