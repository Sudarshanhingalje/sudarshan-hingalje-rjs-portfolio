import { motion } from "framer-motion";

const experiences = [
  {
    role: "Full Stack Developer (Project Work)",
    company: "The Wild Oasis Project",
    period: "2025",
    details:
      "Built a boutique hotel full-stack app using Next.js, Tailwind CSS, Supabase, and PostgreSQL. Includes booking, management, authentication, and 3D animation.",
  },
  {
    role: "Frontend Developer (Internship)",
    company: "Harshad Enterprises",
    period: "2023",
    details:
      "Contributed to UI development, debugging, and code optimization in real-time web applications.",
  },
  {
    role: "CDAC Trainee",
    company: "CDAC Pune",
    period: "2024",
    details:
      "Completed Post Graduate Diploma in Advanced Computing with focus on Java, Spring Boot, Data Structures, DBMS, and Web Tech.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-[#111] text-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center mb-12"
        >
          Experience
        </motion.h2>

        <div className="space-y-10">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold">{exp.role}</h3>
              <p className="text-sm text-gray-300 mb-2">
                {exp.company} • {exp.period}
              </p>
              <p className="text-gray-400 text-sm">{exp.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
