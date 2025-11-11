import LabelTooltip from "@/components/common/LabelTooltip";
import RangeSlider from "../common/RangeSlider";

const Fluorescence = () => {
  return (
    <div className="w-full space-y-2">
      {/* Label + Tooltip */}
      <LabelTooltip keyName="fluorescence" />

      {/* Slider */}
      <RangeSlider keyName="fluorescence" />
    </div>
  );
};

export default Fluorescence;
