// // src/components/Gallery.jsx
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import imagesLoaded from "imagesloaded";
// import { useEffect } from "react";

// import "../styles/global.css";

// gsap.registerPlugin(ScrollTrigger);

// const Gallery = () => {
//   useEffect(() => {
//     const images = gsap.utils.toArray("img");
//     const loader = document.querySelector(".loader--text");

//     const updateProgress = (instance) => {
//       loader.textContent = `${Math.round(
//         (instance.progressedCount * 100) / images.length
//       )}%`;
//     };

//     const showDemo = () => {
//       document.body.style.overflow = "auto";
//       document.scrollingElement.scrollTo(0, 0);
//       gsap.to(document.querySelector(".loader"), { autoAlpha: 0 });

//       gsap.utils.toArray("section").forEach((section, index) => {
//         const w = section.querySelector(".wrapper");
//         const [x, xEnd] =
//           index % 2
//             ? ["100%", (w.scrollWidth - section.offsetWidth) * -1]
//             : [w.scrollWidth * -1, 0];
//         gsap.fromTo(
//           w,
//           { x },
//           {
//             x: xEnd,
//             scrollTrigger: {
//               trigger: section,
//               scrub: 0.5,
//             },
//           }
//         );
//       });
//     };

//     imagesLoaded(images).on("progress", updateProgress).on("always", showDemo);
//   }, []);

//   const w = 1240;
//   const h = 874;

//   return (
//     <>
//       <div className="loader flex items-center justify-center fixed inset-0 bg-black text-white z-50">
//         <div>
//           <h1 className="text-6xl">Loading</h1>
//           <h2 className="loader--text text-2xl">0%</h2>
//         </div>
//       </div>

//       <div className="demo-wrapper overflow-x-hidden">
//         <header className="h-screen flex items-center justify-center">
//           <div>
//             <h1 className="text-6xl">ScrollTrigger</h1>
//             <h2 className="text-2xl">demo</h2>
//           </div>
//         </header>

//         <section className="demo-text">
//           <div className="wrapper text text-[clamp(8rem,15vw,16rem)] font-black leading-none">
//             ABCDEFGHIJKLMNOPQRSTUVWXYZ
//           </div>
//         </section>

//         {[...Array(4)].map((_, sectionIdx) => (
//           <section className="demo-gallery" key={`gallery-${sectionIdx}`}>
//             <ul className="wrapper flex">
//               {[...Array(Math.floor(Math.random() * 2) + 3)].map(
//                 (_, imgIdx) => (
//                   <li
//                     key={`img-${sectionIdx}-${imgIdx}`}
//                     className="shrink-0 w-[clamp(500px,60vw,800px)] pr-4"
//                   >
//                     <img
//                       src={`https://source.unsplash.com/random/${w}x${h}?sig=${Math.floor(
//                         Math.random() * 206
//                       )}`}
//                       width={w}
//                       height={h}
//                       alt="unsplash random"
//                       className="bg-gray-100 w-full h-auto"
//                     />
//                   </li>
//                 )
//               )}
//             </ul>
//           </section>
//         ))}

//         <section className="demo-text">
//           <div className="wrapper text text-[clamp(8rem,15vw,16rem)] font-black leading-none">
//             ABCDEFGHIJKLMNOPQRSTUVWXYZ
//           </div>
//         </section>

//         <footer className="h-[50vh] flex items-center justify-center">
//           <p className="text-xl">
//             Images from{" "}
//             <a href="https://unsplash.com/" className="text-green-700">
//               Unsplash
//             </a>
//           </p>
//         </footer>
//       </div>
//     </>
//   );
// };

// export default Gallery;
