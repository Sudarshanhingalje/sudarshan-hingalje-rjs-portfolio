const CertificateWall = () => {
  const certificateData = [
    {
      id: 1,
      src: "certificates/1.png",
      caption: "Full-Stack Web Development Certificate",
    },
    {
      id: 2,
      src: "certificates/2.png",
      caption: "ReactJS & Redux Toolkit Course",
    },
    {
      id: 3,
      src: "certificates/3.png",
      caption: "Java & Centre for Development of Advanced Computing (CDAC) Graduate",
    },
    {
      id: 4,
      src: "certificates/4.png",
      caption: "Spring Boot & RESTful APIs Development",
    },
    {
      id: 5,
      src: "certificates/5.png",
      caption: "AWS EC2 & Cloud Hosting Services",
    },
    {
      id: 6,
      src: "certificates/6.png",
      caption: "SQL & Relational Databases (MySQL)",
    },
    {
      id: 7,
      src: "certificates/7.png",
      caption: "Tailwind CSS & Modern UI Components",
    },
    {
      id: 8,
      src: "certificates/8.png",
      caption: "Git & GitHub Team Collaboration",
    },
    {
      id: 9,
      src: "certificates/9.png",
      caption: "State Management with Redux Pro",
    },
    {
      id: 10,
      src: "certificates/10.png",
      caption: "Responsive Web Design & Mobile UX",
    },
    {
      id: 11,
      src: "certificates/11.png",
      caption: "Single Page Application (SPA) Routing & Security",
    },
  ];

  return (
    <div
      id="certificates"
      className="flex flex-col items-center justify-center min-h-screen p-4 font-sans"
    >
      <h1 className="text-4xl font-bold mb-8 animate-pulse" style={{ color: "coral" }}>
        Digital Badges Wall
      </h1>

      <div className="w-[90%] max-w-7xl mx-auto">
        <div
          className="gap-6"
          style={{
            columns: "5 200px",
            columnGap: "1.5rem",
          }}
        >
          {certificateData.map((cert) => (
            <div
              key={cert.id}
              className="inline-block w-full mb-6 border-2 border-black p-2 rounded-lg transition-all duration-300 ease-in-out hover:border-[coral] group"
              style={{
                boxShadow: "5px 5px 5px rgba(0,0,0,0.5)",
                breakInside: "avoid",
              }}
            >
              <img
                src={cert.src}
                alt={`Certificate ${cert.id}`}
                className="w-full rounded-lg transition-all duration-300 ease-in-out grayscale group-hover:grayscale-0"
              />
              <p className="text-center italic mt-2 mx-0 p-0 text-sm">
                "{cert.caption}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificateWall;
