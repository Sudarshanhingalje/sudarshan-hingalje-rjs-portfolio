import avatarImg from "../assets/yoga.svg";
import "../styles/index.css";

const TalkingAvatar = ({ isSpeaking }) => {
  return (
    <div className="relative flex flex-col items-center mt-10">
      <img
        src={avatarImg}
        alt="avatar"
        className={`w-32 h-32 object-cover rounded-full transition-transform duration-300 ${
          isSpeaking ? "animate-talk scale-105" : "animate-bounce"
        }`}
      />
    </div>
  );
};

export default TalkingAvatar;
