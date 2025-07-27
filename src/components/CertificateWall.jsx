const CertificateWall = () => {
  const dogData = [
    {
      id: 1,
      src: "certificates/1.png",
      caption: "I'm so happy today!",
    },
    {
      id: 2,
      src: "certificates/2.png",
      caption: "I see those nugs.",
    },
    {
      id: 3,
      src: "certificates/3.png",
      caption: "I love you so much!",
    },
    {
      id: 4,
      src: "certificates/4.png",
      caption: "I'm the baby of the house!",
    },
    {
      id: 5,
      src: "certificates/5.png",
      caption: "Are you gunna throw the ball?",
    },
    {
      id: 6,
      src: "certificates/6.png",
      caption: "C'mon friend!",
    },
    {
      id: 7,
      src: "certificates/7.png",
      caption: "A rose for mommy!",
    },
    {
      id: 8,
      src: "certificates/8.png",
      caption: "You gunna finish that?",
    },
    {
      id: 9,
      src: "certificates/9.png",
      caption: "We can't afford a cat!",
    },
    {
      id: 10,
      src: "certificates/10.png",
      caption: "Dis my fren!",
    },
    {
      id: 11,
      src: "certificates/11.png",
      caption: "A rose for mommy!",
    },
  ];

  return (
    <div
      id="certificates"
      className="flex flex-col items-center justify-center min-h-screen p-4 font-sans"
    >
      <h1 className="text-4xl font-bold mb-8" style={{ color: "coral" }}>
        Digital Badges Wall
      </h1>

      <div className="w-[90%] max-w-7xl mx-auto">
        <div
          className="gap-6"
          style={{
            columns: "5 200px",
            columnGap: "certificates/1.5rem",
          }}
        >
          {dogData.map((dog) => (
            <div
              key={dog.id}
              className="inline-block w-full mb-6 border-2 border-black pcertificates/1 rounded-lg transition-all duration-300 ease-in-out hover:border-orange-400 group"
              style={{
                boxShadow: "5px 5px 5px rgba(0,0,0,0.5)",
                breakInside: "avoid",
              }}
            >
              <img
                src={dog.src}
                alt={`Dog ${dog.id}`}
                className="w-full rounded-lg transition-all duration-300 ease-in-out grayscale group-hover:grayscale-0"
              />
              <p className="text-center italic mycertificates/1 mx-0 p-0 text-sm">
                "{dog.caption}"
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .group:hover {
          border-color: coral;
        }
      `}</style>
    </div>
  );
};

export default CertificateWall;
