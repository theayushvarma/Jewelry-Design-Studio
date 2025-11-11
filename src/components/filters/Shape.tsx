import useSelectionFilter from "@/hooks/useSelectionFilter";
import { diamondSearchFilterData } from "@/utils/data";
import { getDiamondShapes } from "@/utils/icons";
import { Button } from "@heroui/button";
import { ScrollShadow, Tooltip } from "@heroui/react";
import LabelTooltip from "@/components/common/LabelTooltip";

const Shape = () => {
  const { handleDataClick, isDataSelected, data } = useSelectionFilter("shape");
  return (
    <div className="w-full space-y-2 col-span-full">
      {/* Label + Tooltip */}
      <LabelTooltip keyName="shape" />

      {/* Shape Icons */}
      <ScrollShadow orientation="horizontal" className="w-full flex-1 py-2">
        <div className="flex gap-2 items-center min-w-full">
          {data.map((shape) => {
            return (
              <Tooltip key={shape.key} content={shape.label} placement="top">
                <Button
                  onClick={() => handleDataClick(shape.key)}
                  isIconOnly
                  aria-label={shape.label}
                  variant="solid"
                  color={isDataSelected(shape.key) ? "primary" : "default"}
                  size="lg"
                  className="transition-transform hover:scale-105"
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: getDiamondShapes(
                        shape.key,
                        isDataSelected(shape.key)
                      ),
                    }}
                  />
                </Button>
              </Tooltip>
            );
          })}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default Shape;
