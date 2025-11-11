import { tooltipData } from "@/utils/data";
import { Tooltip } from "@heroui/react";
import { Info } from "lucide-react";

const LabelTooltip = ({ keyName }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold">
        {tooltipData[keyName].title || keyName}
      </span>
      <Tooltip
        content={tooltipData[keyName].content || keyName}
        placement={"top"}
        className="max-w-[300px] flex-wrap"
      >
        <Info size={"16px"} />
      </Tooltip>
    </div>
  );
};

export default LabelTooltip;
