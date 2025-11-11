import LabelTooltip from "@/components/common/LabelTooltip";
import RangeSlider from "../common/RangeSlider";
import { Switch } from "@heroui/switch";

const Color = ({ isFancyActive, toggleFancyActive }) => {
  return (
    <div className="w-full space-y-2">
      {/* Label + Tooltip */}
      <div className="w-full flex justify-between items-center">
        <LabelTooltip keyName="color" />
        <Switch
          className="text-sm font-semibold"
          size="sm"
          isSelected={isFancyActive}
          onValueChange={toggleFancyActive}
        >
          Is Fancy?
        </Switch>
      </div>

      {/* Slider */}
      <RangeSlider keyName="color" />
    </div>
  );
};

export default Color;
