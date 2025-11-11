import LabelTooltip from "@/components/common/LabelTooltip";
import RangeSlider from "../common/RangeSlider";

const Polish = () => {
  return (
    <div className="w-full space-y-2">
      {/* Label + Tooltip */}
      <LabelTooltip keyName="polish" />

      {/* Slider */}
      <RangeSlider keyName="polish" />
    </div>
  );
};

export default Polish;
