import LabelTooltip from "@/components/common/LabelTooltip";
import RangeSlider from "../common/RangeSlider";

const Price = () => {
  return (
    <div className="w-full space-y-3">
      {/* Label + Tooltip */}
      <LabelTooltip keyName="price" />

      {/* Slider */}
      <RangeSlider keyName="price" />
    </div>
  );
};

export default Price;
