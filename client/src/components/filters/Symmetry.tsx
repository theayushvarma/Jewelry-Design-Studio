import LabelTooltip from "@/components/common/LabelTooltip";
import RangeSlider from "../common/RangeSlider";

const Symmetry = () => {
  return (
    <div className="w-full space-y-2">
      {/* Label + Tooltip */}
      <LabelTooltip keyName="symmetry" />

      {/* Slider */}
      <RangeSlider keyName="symmetry" />
    </div>
  );
};

export default Symmetry;
