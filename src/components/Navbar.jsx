import bgImage from "../assets/brand.png";

export default function Navbar() {
  return (
    <div className="w-full fixed right-0 flex items-center justify-end px-4 md:px-6 py-2 md:py-4 z-20 max-w-[100vw]">
      <button
        onClick={() => {
          window.location.reload(); // 🔁 This will refresh the entire page
        }}
        className="focus:outline-none"
      >
        <img src={bgImage} alt="Logo" className="h-20 w-auto object-contain" />
      </button>
    </div>
  );
}
