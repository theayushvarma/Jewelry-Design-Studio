import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex  h-screen w-screen justify-center items-center bg-gray-100 no-scrollbar">
      <Image
        removeWrapper
        alt="404 error illustration"
        className="z-0 scale-50 object-cover"
        src="/404.svg"
      />
    </div>
  );
}
