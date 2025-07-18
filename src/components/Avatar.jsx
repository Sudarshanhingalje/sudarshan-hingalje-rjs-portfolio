const Avatar = ({ isSpeaking, className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Face */}
      <circle cx="100" cy="100" r="80" fill="#fcd5ce" />

      {/* Eyes */}
      <circle cx="70" cy="80" r="10" fill="#000" />
      <circle cx="130" cy="80" r="10" fill="#000" />

      {/* Mouth */}
      <ellipse
        cx="100"
        cy="130"
        rx="20"
        ry={isSpeaking ? "12" : "5"}
        fill="#000"
        style={{
          transition: "all 0.3s ease-in-out",
        }}
      />
    </svg>
  );
};

export default Avatar;
