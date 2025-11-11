import LabelTooltip from "@/components/common/LabelTooltip";
import RangeSlider from "../common/RangeSlider";

const Price = () => {
  return (
    <div className="w-full space-y-3">
      <LabelTooltip keyName="priceAUD" />
      <RangeSlider keyName="priceAUD" />
    </div>
  );
};

export default Price;
