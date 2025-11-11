import LabelTooltip from "@/components/common/LabelTooltip";
import RangeSlider from "../common/RangeSlider";

const Clarity = () => {
  return (
    <div className="w-full space-y-2">
      <LabelTooltip keyName="clarity" />
      <RangeSlider keyName="clarity" />
    </div>
  );
};

export default Clarity;
