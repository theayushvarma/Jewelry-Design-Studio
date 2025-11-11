import { Loader } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

// Utility: Check if URL is a video file
const isVideoUrl = (url) => {
  if (!url) return false;
  const videoExtensions = /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)(\?.*)?$/i;
  return videoExtensions.test(url);
};

// Utility: Check if URL is a website
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
  // url = url?.replace("http://", "https://");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const contentType = useMemo(() => {
    if (!url) return "none";
    if (isVideoUrl(url)) return "video";
    if (isWebsiteUrl(url)) return "website";
    return "invalid";
  }, [url]);

  // Handle <video> tag loading
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

  // Handle <iframe> loading using HEAD request to catch 404
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

    // fetch(url, { method: "HEAD", mode: "no-cors" })
    //   .then(() => {
    //     // Cannot access res.ok or headers in no-cors mode
    //     console.log("Request made, but response is opaque");
    //   })
    //   .catch(() => setError("Invalid Video URL"))
    //   .finally(() => setIsLoading(false));
  }, [url, contentType]);

  return (
    <div
      className="flex items-center justify-center w-full h-full overflow-hidden relative"
      onClick={onClick}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <Loader className="animate-spin" />
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="flex items-center justify-center w-full h-full text-danger">
          {error}
        </div>
      )}

      {/* Valid Video Render */}
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

      {/* Valid Website Render */}
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

      {/* No URL at all */}
      {!isLoading && !url && (
        <div className="flex items-center justify-center w-full h-full text-danger">
          Video Not Found
        </div>
      )}
    </div>
  );
}
