import { useAnimationFrame } from "framer-motion";
import { useRef } from "react";
import { certificateImages } from "../data/certificates/Certificates";

// TEXT SCROLLER
const GalleryScroll = ({
  direction = 1,
  text = "My Certifications",
  height = "40vh",
  fontSize = "text-[6vw]",
  speed = 40,
}) => {
  const x = useRef(0);
  const containerRef = useRef();

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;
    x.current += (direction * speed * delta) / 1000;
    const width = containerRef.current.offsetWidth / 2;
    if (Math.abs(x.current) >= width) {
      x.current = 0;
    }
    containerRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center bg-black leading-none"
      style={{ height }}
    >
      <div
        ref={containerRef}
        className={`absolute flex gap-10 whitespace-nowrap text-white items-center font-semibold ${fontSize}`}
      >
        {Array.from({ length: 2 }).flatMap((_, outerIndex) =>
          Array.from({ length: 50 }).map((_, innerIndex) => (
            <span key={`scroll-${outerIndex}-${innerIndex}`} className="mx-5">
              {text}
            </span>
          ))
        )}
      </div>
    </section>
  );
};

// IMAGE SCROLLER
const GalleryRow = ({ direction = 1, speed = 30 }) => {
  const x = useRef(0);
  const containerRef = useRef();

  const images = [...certificateImages, ...certificateImages]; // duplicated for seamless loop

  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;
    x.current += (direction * speed * delta) / 1000;
    const totalWidth = containerRef.current.scrollWidth / 2;
    if (Math.abs(x.current) >= totalWidth) {
      x.current = 0;
    }
    containerRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <section className="bg-[#000000] font-cinzel py-10 overflow-hidden">
      <ul
        ref={containerRef}
        className="flex gap-6 w-fit px-10 transition-transform duration-75 ease-linear"
      >
        {images.map((id, index) => (
          <li
            key={`img-${index}-${id}`}
            className="w-[clamp(200px,30vw,400px)] max-h-[300px] rounded-xl bg-white overflow-hidden shadow-lg"
          >
            <img
              src={`/certificates/${id}.png`}
              alt={`certificate-${id}`}
              className="w-full h-full object-contain"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

// FINAL COMPONENT
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
      <GalleryRow direction={-1} speed={130} />
      <GalleryRow direction={1} speed={50} />
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
