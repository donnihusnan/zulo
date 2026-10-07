"use client";

import React, { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export function GradientText({
  children,
  className = "",
  colors = ["#D99B52", "#F6D8A8", "#E5A95D", "#FDEED9", "#D99B52"],
  animationSpeed = 5,
}: GradientTextProps) {
  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
    backgroundSize: "250% 100%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: `gradientTextFlow ${animationSpeed}s ease-in-out infinite alternate`,
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes gradientTextFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}} />
      <span
        className={`relative inline-block overflow-visible px-1.5 py-0.5 -mx-1.5 align-baseline ${className}`}
      >
        <span
          className="inline-block bg-clip-text text-transparent selection:bg-accent/20"
          style={gradientStyle}
        >
          {children}
        </span>
      </span>
    </>
  );
}

export default GradientText;
