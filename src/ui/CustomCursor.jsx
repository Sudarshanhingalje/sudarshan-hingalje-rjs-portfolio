import AnimatedCursor from "react-animated-cursor";

export default function SplashCursor() {
  return (
    <AnimatedCursor
      innerSize={8}
      outerSize={40}
      color="255, 0, 102" // Bright pink splash
      outerAlpha={0.3}
      innerScale={0.6}
      outerScale={4}
      trailingSpeed={8}
      hasBlendMode={true}
      outerStyle={{ mixBlendMode: "difference" }}
      innerStyle={{ backgroundColor: "#ff0066" }}
      showSystemCursor={false}
      clickables={[
        "a",
        "button",
        "input",
        "textarea",
        "select",
        ".cursor-hover",
      ]}
    />
  );
}
