import { motion } from "framer-motion";

export default function Header() {
  return (
    <section
      id="about"
      className="relative h-screen w-full bg-stone-950
       text-white bg-no-repeat bg-center bg-containur"
      // style={{ backgroundImage: `url(${bgImage})` }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: [0, 1, 1, 0], y: [-100, 0, 0, -100] }}
        transition={{ duration: 6, ease: "easeInOut" }}
        className="absolute top-10 left-10 text-[6vw] font-cinzel leading-[1.05] tracking-tight text-[#d5cdc4]"
      >
        Sudarshan
        <br />
        Hingalje
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: [1], y: [90, 0, 0] }}
        transition={{ delay: 3.1, duration: 1 }}
        className="absolute top-1/2 left-10 transform -translate-y-1/2 flex flex-col items-start space-y-10"
      >
        <p className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl  font-cinzel leading-[1.05] tracking-tight text-[#d5cdc4]">
          Full Stack <br /> <span className="text-9xl">Developer</span>
        </p>
        <a
          href="#about"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg"
        >
          Contact Me
        </a>
      </motion.div>
    </section>
  );
}
