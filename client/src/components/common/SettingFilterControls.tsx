import { Button, Card, CardBody, Tooltip } from "@heroui/react";
import ViewType from "../filters/ViewType";
import SortBy from "../filters/SortBy";
import useAppliedFilters from "@/hooks/useAppliedFilters";
import { FunnelPlus, FunnelX } from "lucide-react";
import { useDiamondSearchApi } from "@/hooks/useDiamondSearchApi";
import { useDiamondSearchFilter } from "@/hooks/useDiamondSearchFilter";
import { getFilterLabel } from "@/utils/data";

export default function SettingFilterControls() {
  const { resetAppliedFilters, toggleFilter, isFilterOpen } =
    useAppliedFilters();
  const { data, total, loading } = useDiamondSearchApi();

  const { filters } = useDiamondSearchFilter();

  const handleReset = () => {
    resetAppliedFilters();
  };

  return (
    <Card className="w-full shadow-sm border border-default mb-3">
      <CardBody className="flex flex-col gap-4 p-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-base font-semibold text-default-900 text-nowrap">
          Search{" "}
          {getFilterLabel(filters?.diamond_type || "")
            ? getFilterLabel(filters?.diamond_type || "")
            : ""}{" "}
          Diamonds
        </div>

        <div className="flex flex-wrap gap-2 justify-start sm:justify-end items-center w-full sm:w-auto">
          <SortBy />

          <Tooltip content="Reset all filters" placement="top">
            <Button
              size="md"
              color="default"
              variant="flat"
              onClick={handleReset}
              className="min-w-[80px]"
            >
              Reset
            </Button>
          </Tooltip>

          <ViewType />
        </div>
      </CardBody>
    </Card>
  );
}
