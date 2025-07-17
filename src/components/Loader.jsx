import loaderGif from "../assets/loader.gif"; // Adjust path as needed

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src={loaderGif}
        alt="Loading..."
        className="w-20 h-20 object-contain"
      />
    </div>
  );
};

export default Loader;
