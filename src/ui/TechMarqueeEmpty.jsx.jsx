import Marquee from "react-fast-marquee";

export default function TechMarqueeEmpty() {
  return (
    <section className="bg-blue-300 transform -skew-y-4  py-6">
      <div className="flex flex-wrap items-center gap-6 ...">
        <Marquee gradient={false} speed={50} pauseOnHover={true}></Marquee>
      </div>
    </section>
  );
}
