import React, { useEffect, useRef, useState } from "react";
import useAppliedFilters from "@/hooks/useAppliedFilters";
import { Button, Tooltip } from "@heroui/react";
import { ChevronUp, FunnelPlus, FunnelX } from "lucide-react";

const BackToFilter = () => {
  const { toggleFilter, isFilterOpen } = useAppliedFilters();
  const [isFilterOutOfView, setIsFilterOutOfView] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const target = document.getElementById("filter-section");
    if (!target) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsFilterOutOfView(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(target);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!isFilterOpen) {
      toggleFilter();
    }
  };

  if (!isFilterOutOfView) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Tooltip content="Back to Filters" placement="top">
        <Button
          size="md"
          color="primary"
          onClick={handleClick}
          isIconOnly
          endContent={<ChevronUp size="16px" />}
        ></Button>
      </Tooltip>
    </div>
  );
};

export default BackToFilter;
