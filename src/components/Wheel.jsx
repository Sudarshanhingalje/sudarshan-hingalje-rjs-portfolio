import { useEffect, useRef } from "react";
import wheelImg from "../assets/wheel.png"; // adjust path as needed

const Wheel = () => {
  const wheelRef = useRef(null);
  const rotation = useRef(0);

  useEffect(() => {
    const handleScroll = (e) => {
      const delta = window.scrollY;
      const newRotation = delta * 0.2; // adjust speed
      rotation.current = newRotation;
      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <img
        src={wheelImg}
        alt="Scroll Wheel"
        ref={wheelRef}
        className="w-24 h-24 transition-transform duration-75"
      />
    </div>
  );
};

export default Wheel;
