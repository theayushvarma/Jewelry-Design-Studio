// App.tsx
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import IndexPage from "@/pages/index";
import ErrorPage from "@/pages/error";

import { useConfig } from "@/hooks/useConfig";
import { Loader } from "lucide-react";

function App() {
  const location = useLocation();
  const match = location.pathname.match(/^\/([^/]+)$/);
  const token = match ? match[1] : null;

  const { fetchConfig, data, loading, error } = useConfig();
  const [attempted, setAttempted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (token && !attempted) {
      fetchConfig(token).then((success: boolean) => {
        setIsValid(success);
        setAttempted(true);
      });
    } else if (!token) {
      setAttempted(true);
    }
  }, [token, attempted]);

  // 👉 Show loader until config check is complete
  if (!attempted || loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader className="animate-spin w-6 h-6" />
      </div>
    );
  }

  // 👉 Once validation is done, show routes
  return (
    <Routes>
      <Route path="/" element={<ErrorPage />} />
      {token && isValid && <Route path="/:id" element={<IndexPage />} />}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
