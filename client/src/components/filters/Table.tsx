import LabelTooltip from "@/components/common/LabelTooltip";
import RangeSlider from "../common/RangeSlider";

const Table = () => {
  return (
    <div className="w-full space-y-3">
      {/* Label + Tooltip */}
      <LabelTooltip keyName="table" />

      {/* Slider */}
      <RangeSlider keyName="table" />
    </div>
  );
};

export default Table;
