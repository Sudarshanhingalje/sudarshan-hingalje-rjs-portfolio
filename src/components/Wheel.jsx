import { motion, useScroll, useTransform } from "framer-motion";
import wheelImg from "../assets/wheel.png";

const ScrollWheel = () => {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <motion.img
      src={wheelImg}
      alt="Steering Wheel"
      style={{ rotate }}
      className="fixed right-10 top-1/2 -translate-y-1/2 w-40 h-40 z-50 pointer-events-none select-none"
    />
  );
};

export default ScrollWheel;
