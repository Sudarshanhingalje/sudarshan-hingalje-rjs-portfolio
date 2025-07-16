import Lottie from "lottie-react";
import loaderAnimation from "../assets/Loader.json";

const Loader = () => {
  return (
    <div className="flex items-center justify-center screen ">
      <Lottie
        animationData={loaderAnimation}
        loop={true}
        className="w-50 h-40"
      />
    </div>
  );
};

export default Loader;
