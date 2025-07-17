import loaderGif from "../assets/loader.gif"; // Adjust path as needed

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src={loaderGif}
        alt="Loading..."
        className="w-50 h-50 object-contain "
      />
    </div>
  );
};

export default Loader;
