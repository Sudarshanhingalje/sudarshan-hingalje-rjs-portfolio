const Footer = () => {
  return (
    <footer className="flex flex-col items-center pb-10 bg-[#0b0b0b] text-[#b0b2c3]">
      <p className="text-xs text-gray-400">Anurag Singh © 2024</p>
      <div className="my-4">
        <img src="/assets/brand.png" alt="Brand Logo" width={50} height={50} />
      </div>
      <ul className="flex items-center justify-center gap-6 text-sm">
        <li>
          <a
            href="https://www.linkedin.com/in/anuragsinghbam/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-5 hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M100.3 448H7.4V148.9h92.9zM53.8...z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/anuragsinghbam"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-5 hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path fill="currentColor" d="M389.2 48h70.6L305.6 224.2...z" />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/procodrr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-5 hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3...z" />
            </svg>
          </a>
        </li>
        <li>
          <a href="mailto:anuragsinghbam@gmail.com">
            <svg
              className="w-5 hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path fill="currentColor" d="M64 112c-8.8 0-16 7.2-16 16...z" />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/@procodrr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-5 hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path fill="currentColor" d="M549.7 124.1c-6.3-23.7-24.8...z" />
            </svg>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
