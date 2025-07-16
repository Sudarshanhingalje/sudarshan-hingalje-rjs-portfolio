module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "import",
      {
        libraryName: "antd", // or any other library
        libraryDirectory: "es",
        style: "css", // 'true' for less/scss
      },
      "antd",
    ],
  ],
};
