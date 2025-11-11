import { getDiamondShapes } from "@/utils/icons";
import { Image as ImageContainer } from "@heroui/react";
import { Loader } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

export default function ImageView({
  data,
  tempSrc = null,
  className = "h-full w-full object-contain",
  onClick = () => {},
}) {
  const { shape, certificate_no: alt, image_url, image } = data ?? {};
  const src = tempSrc || image_url || image || "";

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const shapeSVG = useMemo(() => {
    if (!shape) return "";
    return getDiamondShapes(shape.split(",")[0], false, "150px");
  }, [shape]);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoaded(true);
      setHasError(false);
    };

    img.onerror = () => {
      setIsLoaded(false);
      setHasError(true);
    };
  }, [src]);

  const showDefault = !src || hasError;

  return (
    <div
      className="relative flex items-center justify-center w-full h-full overflow-hidden "
      onClick={onClick}
    >
      {/* Spinner Loader */}
      {!isLoaded && !showDefault && (
        <div className="absolute z-10 flex items-center justify-center w-full h-full bg-white/40 backdrop-blur-sm">
          <Loader className="animate-spin" />
        </div>
      )}

      {/* Final Image */}
      {!showDefault && (
        <img
          src={src}
          alt={alt || "Diamond Image"}
          loading="lazy"
          className={`transition-all object-cover duration-500 ease-in-out ${
            isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md scale-105"
          } ${className}`}
        />
      )}

      {/* Shape SVG fallback */}
      {showDefault && shapeSVG && (
        <div
          className="w-full h-full flex justify-center items-center scale-75"
          dangerouslySetInnerHTML={{ __html: shapeSVG }}
        />
      )}

      {/* Default image fallback */}
      {showDefault && !shapeSVG && (
        <ImageContainer
          src="/notification_dummy_image.png"
          alt="Default Diamond Image"
          loading="lazy"
          className={`transition-opacity duration-500 ${className}`}
        />
      )}
    </div>
  );
}
