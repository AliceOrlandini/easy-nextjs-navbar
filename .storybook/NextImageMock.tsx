import React from "react";
import type { ImageProps } from "next/image";

const NextImageMock = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  fill,
  priority,
  quality,
  placeholder,
  blurDataURL,
  unoptimized,
  overrideSrc,
  ...props
}: ImageProps) => {
  let imgSrc = "";
  if (typeof src === "string") {
    imgSrc = src;
  } else if ("default" in src) {
    imgSrc = src.default.src;
  } else if ("src" in src) {
    imgSrc = src.src;
  }
  const fillStyle: React.CSSProperties = fill
    ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        inset: 0,
        objectFit: "cover",
      }
    : {};

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ ...fillStyle, ...style }}
      {...props}
    />
  );
};

export default NextImageMock;
