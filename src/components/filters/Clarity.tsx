import LabelTooltip from "@/components/common/LabelTooltip";
import RangeSlider from "../common/RangeSlider";

const Clarity = () => {
  return (
    <div className="w-full space-y-2">
      {/* Label + Tooltip */}
      <LabelTooltip keyName="clarity" />

      {/* Slider */}
      <RangeSlider keyName="clarity" />
    </div>
  );
};

export default Clarity;
