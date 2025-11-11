import useSelectionFilter from "@/hooks/useSelectionFilter";
import { Button, Tooltip } from "@heroui/react";
import LabelTooltip from "@/components/common/LabelTooltip";

const Lab = () => {
  const { handleDataClick, isDataSelected, data } = useSelectionFilter("lab");

  return (
    <div className="w-full space-y-2">
      <LabelTooltip keyName="lab" />

      <div className="flex items-center gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 py-1 px-1">
        {data?.map((lab, index) => (
          <Tooltip key={lab.key} content={lab.label} placement="top">
            <Button
              size="sm"
              onClick={() => handleDataClick(lab.key, true)}
              color={isDataSelected(lab.key) ? "primary" : "default"}
            >
              {lab.label}
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default Lab;
