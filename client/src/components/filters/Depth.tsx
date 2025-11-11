import LabelTooltip from "@/components/common/LabelTooltip";
import RangeSlider from "../common/RangeSlider";

const Depth = () => {
  return (
    <div className="w-full space-y-3">
      {/* Label + Tooltip */}
      <LabelTooltip keyName="depth" />

      {/* Slider */}
      <RangeSlider keyName="depth" />
    </div>
  );
};

export default Depth;
