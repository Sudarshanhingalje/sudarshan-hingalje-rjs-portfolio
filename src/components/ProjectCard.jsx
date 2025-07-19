const ProjectCard = ({ title, desc, img, link }) => {
  return (
    <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl p-5 rounded-2xl hover:scale-105 transition-all duration-300 w-full max-w-sm">
      <img src={img} alt={title} className="rounded-lg mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-300 mb-4">{desc}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-green-400 hover:underline"
      >
        View Project →
      </a>
    </div>
  );
};

export default ProjectCard;
