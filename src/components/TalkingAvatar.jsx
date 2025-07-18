import avatarImg from "../assets/yoga.svg";

const TalkingAvatar = ({ isSpeaking }) => {
  return (
    <div className="relative flex flex-col items-center">
      <img
        src={avatarImg}
        alt="avatar"
        className={`w-[100px] sm:w-[140px] md:w-[180px] lg:w-[220px] xl:w-[260px] max-w-[80vw] h-auto object-contain transition-transform duration-300 ${
          isSpeaking ? "animate-talk scale-105" : ""
        }`}
      />
    </div>
  );
};

export default TalkingAvatar;
