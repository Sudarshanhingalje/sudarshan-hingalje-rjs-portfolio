import { useState, useEffect } from "react";
import axios from "axios";
import { projects as fallbackProjects } from "../data/projects/ProjectDone";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const Project = () => {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await axios.get(`${API_URL}/projects`);
        if (res.data?.success && Array.isArray(res.data.data)) {
          const mapped = res.data.data.map(p => ({
            id: p.id,
            title: p.title,
            shortTitle: p.title.split(" - ")[0] || p.title,
            category: p.isFeatured ? "Featured Project" : "Web Application",
            status: p.isFeatured ? "Live" : "Active",
            img: p.imageUrl,
            link: p.liveUrl,
            github: p.githubUrl,
            tech: p.techStack || [],
            displayOrder: p.displayOrder || 0
          })).sort((a, b) => a.displayOrder - b.displayOrder);
          setProjectList(mapped);
        } else {
          setProjectList(fallbackProjects);
        }
      } catch (err) {
        console.warn("Could not fetch projects from backend, using fallback:", err);
        setProjectList(fallbackProjects);
      }
    }
    fetchProjects();
  }, []);

  const activeProjects = projectList.length > 0 ? projectList : fallbackProjects;

  return (
    <div
      id="projects"
      className="dark:text-white text-black px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 md:py-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xs sm:text-sm font-light tracking-[0.2em] text-gray-400 uppercase mb-4">
            PROJECT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {activeProjects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl bg-[#043d74] p-4 sm:p-6 aspect-[4/3] ">
                <div className="relative h-full w-full overflow-hidden ">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>

                  {/* Project Info Overlay */}
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-white font-semibold text-sm sm:text-lg mb-1">
                        {project.shortTitle}
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm mb-2">
                        {project.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/70 bg-white/20 px-2 py-1 rounded-full">
                          {project.status}
                        </span>
                        <div className="flex space-x-2">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 hover:text-white transition-colors"
                          >
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 hover:text-white transition-colors"
                          >
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1">
                      <span className="text-white text-xs font-medium">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack Icons (Mobile optimized) */}
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 md:block hidden">
                    <div className="flex space-x-1 sm:space-x-2">
                      {project.tech.slice(0, 2).map((tech, index) => (
                        <div
                          key={index}
                          className="bg-white/20 backdrop-blur-sm rounded-full px-1 sm:px-2 py-1"
                        >
                          <span className="text-white text-xs font-medium">
                            {tech}
                          </span>
                        </div>
                      ))}
                      {project.tech.length > 2 && (
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-1 sm:px-2 py-1">
                          <span className="text-white text-xs font-medium">
                            +{project.tech.length - 2}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
