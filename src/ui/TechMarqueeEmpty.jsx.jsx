import Marquee from "react-fast-marquee";

export default function TechMarqueeEmpty() {
  return (
    <section className="bg-gradient-to-r from-blue-400 to-blue-700 transform -skew-y-6 py-4">
      <Marquee
        gradient={false}
        speed={60}
        pauseOnHover={true}
        className="text-white text-lg tracking-widest font-semibold uppercase"
      >
        ✦ Dynamic ✦ Scalable ✦ Search Optimized ✦ Interactive ✦ Secure ✦
        Reliable ✦ Engaging ✦ Accessible ✦ Performant ✦
      </Marquee>
    </section>
  );
}
