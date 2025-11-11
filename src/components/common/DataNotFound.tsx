import useAppliedFilters from "@/hooks/useAppliedFilters";
import { Button } from "@heroui/button";
import { RefreshCwIcon } from "lucide-react";

export default function DataNotFound({ isImage = true }) {
  const { resetAppliedFilters } = useAppliedFilters();
  return (
    <div className="flex flex-col gap-3 items-center justify-center grow h-full w-full min-h-[400px]">
      {isImage && (
        <div className="">
          <img
            src="/data-not-found.svg"
            className="min-h-[200px] max-h-[160px]"
            alt="image"
          />
        </div>
      )}
      <h2 className="font-semibold text-xl">No exact matches</h2>
      <div className="text-md text-center  ">
        Try changing or removing some of your filters.
      </div>
      <Button
        type="button"
        color="primary"
        variant="solid"
        onClick={resetAppliedFilters}
        startContent={<RefreshCwIcon size={16} />}
      >
        Reset All Filters
      </Button>
    </div>
  );
}
