import LabelTooltip from "@/components/common/LabelTooltip";
import RangeSlider from "../common/RangeSlider";

const Cut = () => {
  return (
    <div className="w-full space-y-2">
      <LabelTooltip keyName="cut" />

      <RangeSlider keyName="cut" />
    </div>
  );
};

export default Cut;
