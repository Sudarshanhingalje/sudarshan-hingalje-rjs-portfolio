import { useEffect, useRef, useState } from "react";
import TalkingBubble from "./TalkingBubble";

const speechText = `👋 Hi! My name is Sudarshan Hingalje.
I'm a Full Stack Developer.
Spin the Sudarshan chakra to know more about my journey!`;

const AvatarSpeaker = () => {
  const avatarRef = useRef(null);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleTriggered, setBubbleTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !bubbleTriggered) {
          setShowBubble(true);
          setBubbleTriggered(true);
          setTimeout(() => setShowBubble(false), 9000); // hide after 9s
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (avatarRef.current) observer.observe(avatarRef.current);

    return () => {
      if (avatarRef.current) observer.unobserve(avatarRef.current);
    };
  }, [bubbleTriggered]);

  return (
    <div ref={avatarRef} className="relative w-fit h-fit mx-auto">
      {showBubble && <TalkingBubble message={speechText} />}
    </div>
  );
};

export default AvatarSpeaker;
