import { Loader } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

const isVideoUrl = (url) => {
  if (!url) return false;
  const videoExtensions = /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)(\?.*)?$/i;
  return videoExtensions.test(url);
};

const isWebsiteUrl = (url) => {
  if (!url) return false;
  return /^https?:\/\//i.test(url);
};

export default function VideoView({
  url,
  className = "h-full w-full object-contain",
  onClick = () => {},
  alt = "Video Content",
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const contentType = useMemo(() => {
    if (!url) return "none";
    if (isVideoUrl(url)) return "video";
    if (isWebsiteUrl(url)) return "website";
    return "invalid";
  }, [url]);

  useEffect(() => {
    if (contentType !== "video") return;

    setIsLoading(true);
    setError(null);

    const video = document.createElement("video");
    video.src = url;

    const handleCanPlayThrough = () => setIsLoading(false);
    const handleError = () => {
      setError("Invalid Video URL");
      setIsLoading(false);
    };

    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("error", handleError);
    };
  }, [url, contentType]);

  useEffect(() => {
    if (contentType !== "website") return;

    setIsLoading(true);
    setError(null);

    const proxiedUrl = `https://cors-proxy-server-url.vercel.app/proxy?url=${encodeURIComponent(url)}`;

    fetch(proxiedUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid Video URL");
        }
      })
      .catch(() => {
        setError("Invalid Video URL");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url, contentType]);

  return (
    <div
      className="flex items-center justify-center w-full h-full overflow-hidden relative"
      onClick={onClick}
    >
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <Loader className="animate-spin" />
        </div>
      )}

      {!isLoading && error && (
        <div className="flex items-center justify-center w-full h-full text-danger">
          {error}
        </div>
      )}

      {!isLoading && !error && contentType === "video" && (
        <video
          src={url}
          className={`transition-opacity duration-500 ${className}`}
          controls
          autoPlay
          muted
          loop
        />
      )}

      {!isLoading && !error && contentType === "website" && (
        <iframe
          src={url}
          title={alt}
          className={`transition-opacity duration-500 ${className}`}
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError("Invalid Video URL");
            setIsLoading(false);
          }}
        />
      )}

      {!isLoading && !url && (
        <div className="flex items-center justify-center w-full h-full text-danger">
          Video Not Found
        </div>
      )}
    </div>
  );
}
