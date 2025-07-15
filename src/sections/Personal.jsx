import { motion } from "framer-motion";

const personalInfo = {
  name: "Sudarshan Kalgonda Hingalje",
  education: [
    "PG-DAC – CDAC Pune, 2024",
    "B.Tech – Mechanical Engineering, 2023",
    "Diploma – Mechanical Engineering, 2019",
    "12th – 2017",
    "10th – 2015",
  ],
  hobbies: [
    "Football",
    "Reading",
    "Wildlife Photography",
    "Photo/Video Editing",
  ],
  tools: ["AutoCAD", "CATIA V5", "Figma", "Blender"],
};

const Personal = () => {
  return (
    <section id="personal" className="py-20 bg-[#0f0f0f] text-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center mb-12"
        >
          About Me
        </motion.h2>

        <div className="space-y-6 text-gray-300 text-center">
          <p className="text-lg font-medium">{personalInfo.name}</p>

          <div>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <ul>
              {personalInfo.education.map((edu, i) => (
                <li key={i}>{edu}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Hobbies</h3>
            <p>{personalInfo.hobbies.join(", ")}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Tools & Software</h3>
            <p>{personalInfo.tools.join(", ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personal;
