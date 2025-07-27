// const DogGallery = () => {
//   const dogData = [
//     {
//       id: 1,
//       src: "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
//       caption: "I'm so happy today!",
//     },
//     {
//       id: 2,
//       src: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
//       caption: "I see those nugs.",
//     },
//     {
//       id: 3,
//       src: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
//       caption: "I love you so much!",
//     },
//     {
//       id: 4,
//       src: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
//       caption: "I'm the baby of the house!",
//     },
//     {
//       id: 5,
//       src: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
//       caption: "Are you gunna throw the ball?",
//     },
//     {
//       id: 6,
//       src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
//       caption: "C'mon friend!",
//     },
//     {
//       id: 7,
//       src: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
//       caption: "A rose for mommy!",
//     },
//     {
//       id: 8,
//       src: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
//       caption: "You gunna finish that?",
//     },
//     {
//       id: 9,
//       src: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
//       caption: "We can't afford a cat!",
//     },
//     {
//       id: 10,
//       src: "https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
//       caption: "Dis my fren!",
//     },
//   ];

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4 font-sans">
//       <h1 className="text-4xl font-bold mb-8" style={{ color: "coral" }}>
//         The Purest of Doggos
//       </h1>

//       <div className="w-[90%] max-w-7xl mx-auto">
//         <div
//           className="gap-6"
//           style={{
//             columns: "5 200px",
//             columnGap: "1.5rem",
//           }}
//         >
//           {dogData.map((dog) => (
//             <div
//               key={dog.id}
//               className="inline-block w-full mb-6 border-2 border-black p-1 rounded-lg transition-all duration-300 ease-in-out hover:border-orange-400 group"
//               style={{
//                 boxShadow: "5px 5px 5px rgba(0,0,0,0.5)",
//                 breakInside: "avoid",
//               }}
//             >
//               <img
//                 src={dog.src}
//                 alt={`Dog ${dog.id}`}
//                 className="w-full rounded-lg transition-all duration-300 ease-in-out grayscale group-hover:grayscale-0"
//               />
//               <p className="text-center italic my-1 mx-0 p-0 text-sm">
//                 "{dog.caption}"
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         .group:hover {
//           border-color: coral;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DogGallery;
