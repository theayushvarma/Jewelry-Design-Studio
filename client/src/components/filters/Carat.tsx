import LabelTooltip from "@/components/common/LabelTooltip";
import RangeSlider from "../common/RangeSlider";

const Carat = () => {
  return (
    <div className="w-full space-y-3">
      <LabelTooltip keyName="carat" />
      <RangeSlider keyName="carat" />
    </div>
  );
};

export default Carat;
