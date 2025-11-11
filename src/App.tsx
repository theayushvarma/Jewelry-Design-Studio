import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

import DiamondPage from "@/pages/Diamonds";
import ErrorPage from "@/pages/error";

function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 300); 
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader className="animate-spin w-6 h-6 text-gray-600" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/diamonds" replace />} />
      <Route path="/diamonds" element={<DiamondPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
