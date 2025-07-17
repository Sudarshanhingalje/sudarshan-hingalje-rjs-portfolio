import loaderGif from "../assets/Loader.gif";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src={loaderGif} alt="Loading..." className="w-75 h-75" />
    </div>
  );
};

export default Loader;
