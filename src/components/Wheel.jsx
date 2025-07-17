import { motion, useScroll, useTransform } from "framer-motion";
import wheelImg from "../assets/wheel.png";
const ScrollWheel = () => {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <div className="flex items-center justify-center min-h-[200vh] bg-black">
      <motion.img
        src={wheelImg}
        alt="Steering Wheel"
        style={{ rotate }}
        className="w-40 h-40 pointer-events-none select-none"
      />
    </div>
  );
};

export default ScrollWheel;
