import LabelTooltip from "@/components/common/LabelTooltip";
import RangeSlider from "../common/RangeSlider";

const Carat = () => {
  return (
    <div className="w-full space-y-3">
      {/* Label + Tooltip */}
      <LabelTooltip keyName="carat" />

      {/* Slider */}
      <RangeSlider keyName="carat" />
    </div>
  );
};

export default Carat;
