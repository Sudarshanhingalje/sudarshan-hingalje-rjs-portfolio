import { useEffect, useRef, useState } from "react";
import { certificateImages } from "../data/certificates/Certificates";

// 🖼️ Seamless infinite scroll component with pause on hover
const GalleryRow = ({ speed = 0.5 }) => {
  const containerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let x = 0;
    let frameId;

    const animate = () => {
      if (!paused) {
        x -= speed;
        if (Math.abs(x) >= container.scrollWidth / 2) x = 0;
        container.style.transform = `translateX(${x}px)`;
      }
      frameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameId);
  }, [paused, speed]);

  const images = [...certificateImages, ...certificateImages];

  return (
    <section className=" font-cinzel py-10 overflow-hidden relative">
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <ul
          ref={containerRef}
          className="flex w-fit gap-6 px-10 transition-transform duration-75 ease-linear"
        >
          {images.map((id, index) => (
            <li
              key={`img-${index}-${id}`}
              className="w-[clamp(200px,25vw,350px)] max-h-[300px] bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={`/certificates/${id}.png`}
                alt={`certificate-${id}`}
                className="w-full h-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// 🔁 Optional text scroller
const GalleryScroll = ({
  direction = 1,
  text = "My Certifications",
  height = "40vh",
  fontSize = "text-[6vw]",
  speed = 40,
}) => {
  const x = useRef(0);
  const containerRef = useRef();

  useEffect(() => {
    let frameId;
    const animate = () => {
      x.current += direction * speed * 0.016;
      const width = containerRef.current.offsetWidth / 2;
      if (Math.abs(x.current) >= width) {
        x.current = 0;
      }
      containerRef.current.style.transform = `translateX(${x.current}px)`;
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, [direction, speed]);

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center leading-none"
      style={{ height }}
    >
      <div
        ref={containerRef}
        className={`absolute flex gap-10 whitespace-nowrap text-black dark:text-white items-center font-semibold ${fontSize}`}
      >
        {Array.from({ length: 2 }).flatMap((_, i) =>
          Array.from({ length: 30 }).map((_, j) => (
            <span key={`scroll-${i}-${j}`} className="mx-5">
              {text}
            </span>
          ))
        )}
      </div>
    </section>
  );
};

// 🌟 Main Component Export
const GalleryMy = () => {
  return (
    <div className="w-full m-0 p-0 leading-none font-cinzel">
      <GalleryScroll
        direction={1}
        text="My Certifications"
        height="40vh"
        fontSize="text-[6vw]"
        speed={250}
      />
      <GalleryRow speed={5} />
      <GalleryScroll
        direction={1}
        text="Achievements Gallery"
        height="40vh"
        fontSize="text-[6vw]"
        speed={300}
      />
    </div>
  );
};

export default GalleryMy;
