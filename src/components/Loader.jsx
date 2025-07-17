import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <DotLottieReact
        src="/path/to/loader.lottie"
        autoplay
        loop
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default Loader;
