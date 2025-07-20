import { GalleryScroll } from "./GalleryMy";

export const GalleryMy = () => {
  const w = 1240;
  const h = 874;

  return (
    <div className="w-full m-0 p-0 leading-none">
      {/* TOP SCROLLING TEXT */}
      <GalleryScroll
        direction={1}
        text="My Certifications"
        height="40vh"
        fontSize="text-[6vw]"
      />

      {/* ✅ Replaced gallery placeholder with actual horizontal image section */}
      <section className="bg-[#d43a3a] overflow-x-auto whitespace-nowrap py-8">
        <ul className="flex gap-6 px-6">
          {certificateImages.map((id) => (
            <li
              key={`certificate-${id}`}
              className="shrink-0 w-[clamp(300px,50vw,700px)] rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={`/certificates/${id}.png`}
                alt={`certificate-${id}`}
                className="w-full h-auto object-cover bg-white"
              />
            </li>
          ))}
        </ul>
      </section>
      {/* BOTTOM SCROLLING TEXT */}
      <GalleryScroll
        direction={-1}
        text="Achievements Gallery"
        height="40vh"
        fontSize="text-[6vw]"
      />
    </div>
  );
};
