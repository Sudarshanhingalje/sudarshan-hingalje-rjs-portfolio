import "./Avatar.css"; // for CSS animation

export default function Avatar() {
  return (
    <div className="relative w-[220px] h-auto">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Example avatar */}
        <circle cx="100" cy="100" r="80" fill="#f3f3f3" />
        <circle cx="70" cy="85" r="10" fill="#333" /> {/* Left eye */}
        <circle cx="130" cy="85" r="10" fill="#333" /> {/* Right eye */}
        <path
          id="mouth"
          d="M70 130 Q100 150 130 130"
          stroke="#000"
          strokeWidth="5"
          fill="none"
          className="mouth"
        />
      </svg>
    </div>
  );
}
