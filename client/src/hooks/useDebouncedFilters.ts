import { useEffect, useState } from "react";

export default function useDebouncedFilters(filters, delay = 300) {
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, delay);

    return () => clearTimeout(handler);
  }, [filters, delay]);

  return debouncedFilters;
}
