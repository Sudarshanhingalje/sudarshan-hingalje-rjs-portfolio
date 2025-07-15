import devImage from "../assets/dev-image.png"; // Replace with your own image path

const About = () => {
  const techTags = [
    "#javascript",
    "#react.js",
    "#redux",
    "#node.js",
    "#express.js",
    "#mongoDB",
    "#mongoose",
    "#cloudinary",
    "#ejs",
    "#html",
    "#css",
    "#sass",
    "#bootstrap",
    "#tailwind",
    "#git",
    "#github",
    "#aws",
    "#terminal",
    "#adobeXD",
    "#figma",
  ];

  return (
    <section
      id="about"
      className="bg-gray-900 text-white px-6 py-12 md:flex md:justify-between md:items-start gap-10"
    >
      {/* Left Section */}
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">ABOUT ME</h2>
        <p className="text-lg mb-6">
          I help business owners and busy web developers to design & develop
          creative websites that fit their vision and attract visitors to stay
          forever. Technologies and tools that I use to create such awesome
          websites:
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {techTags.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-cyan-500 transition duration-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-cyan-400 mb-4">
          MERN STACK
        </h3>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg"
              alt="MongoDB"
              className="h-10 mx-auto"
            />
            <p className="text-cyan-400 mt-1">M</p>
          </div>
          <div className="text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"
              alt="Express"
              className="h-10 bg-white p-1 rounded"
            />
            <p className="text-cyan-400 mt-1">E</p>
          </div>
          <div className="text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              alt="React"
              className="h-10 mx-auto"
            />
            <p className="text-cyan-400 mt-1">R</p>
          </div>
          <div className="text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
              alt="Node.js"
              className="h-10 mx-auto"
            />
            <p className="text-cyan-400 mt-1">N</p>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center items-center">
        <img
          src={devImage}
          alt="Developer working illustration"
          className="w-full max-w-md"
        />
      </div>
    </section>
  );
};

export default About;
