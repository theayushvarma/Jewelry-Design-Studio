import { Chip, ScrollShadow } from "@heroui/react";
import useAppliedFilters from "@/hooks/useAppliedFilters";
import LabelTooltip from "./LabelTooltip";
import { getFilterLabel, tooltipData } from "@/utils/data";

export default function AppliedFilters() {
  const { appliedFilters, handleRemoveFilter } = useAppliedFilters();

  const notAllowed = [
    "diamond_type",
    "sort_field",
    "sort_order",
    "sort_by",
    "isFancyActive",
  ];

  if (!appliedFilters?.length) {
    return;
  }

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-3 my-3">
      <div className="flex-shrink-0">
        <LabelTooltip keyName="appliedFilter" />
      </div>

      <ScrollShadow
        orientation="horizontal"
        hideScrollBar
        className="w-full flex-1"
      >
        <div className="flex gap-2 items-center min-w-full">
          {appliedFilters?.length ? (
            appliedFilters.map(({ key, value }, index) =>
              !!value ? (
                <Chip
                  key={index}
                  variant="flat"
                  {...(!notAllowed.includes(key) && {
                    onClose: () => handleRemoveFilter(key),
                  })} 
                >
                  {`${tooltipData[key]?.title}: ${!value.toString().split().includes("-") ? value.toString().split(",").map((item) => getFilterLabel(item)) : value}`}
                </Chip>
              ) : (
                ""
              )
            )
          ) : (
            <span className="text-sm text-default-500">No filters applied</span>
          )}
        </div>
      </ScrollShadow>
    </div>
  );
}
