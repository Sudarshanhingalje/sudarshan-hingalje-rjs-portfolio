// import { useState } from "react";
// import TalkingBubble from "./TalkingBubble";

// const speechText = `👋 Hi! My name is Sudarshan Hingalje.
// I'm a Full Stack Developer.
// Spin the Sudarshan chakra to know more about my journey!`;

// const AvatarSpeaker = () => {
//   const [hovering, setHovering] = useState(false);

//   return (
//     <div
//       className="relative w-fit h-fit mx-auto"
//       onMouseEnter={() => setHovering(true)}
//       onMouseLeave={() => setHovering(false)}
//     >
//       {/* Avatar Image */}
//       <img
//         src="/src/assets/yoga.svg" // make sure this path is correct
//         alt="Avatar"
//         className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[220px] xl:w-[240px] max-w-[80vw] h-auto object-contain"
//       />

//       {/* Show bubble on hover */}
//       {hovering && (
//         <div className="absolute -top-12 left-full ml-4">
//           <TalkingBubble message={speechText} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AvatarSpeaker;
