import useSelectionFilter from "@/hooks/useSelectionFilter";

import { getFancyColors } from "@/utils/icons";
import { Button } from "@heroui/button";
import { Image, ScrollShadow, Switch, Tooltip } from "@heroui/react";
import LabelTooltip from "@/components/common/LabelTooltip";
import ImageView from "../common/ImageView";

const FancyColor = ({ isFancyActive, toggleFancyActive }) => {
  const { handleDataClick, isDataSelected, data } =
    useSelectionFilter("fancy_color");

  return (
    <div className="w-full space-y-2">
      {/* Label + Tooltip */}
      <div className="w-full flex justify-between items-center">
        <LabelTooltip keyName="fancy_color" />
        <Switch
          size="sm"
          className="text-sm font-semibold"
          isSelected={isFancyActive}
          onValueChange={toggleFancyActive}
        >
          Is Fancy?
        </Switch>
      </div>

      {/* Fancy Color Icons */}
      <ScrollShadow orientation="horizontal" className="w-full flex-1 py-2">
        <div className="flex gap-2 items-center min-w-full">
          {data.map((fancy_color) => {
            return (
              <Tooltip
                key={fancy_color?.key}
                content={fancy_color?.label}
                placement="top"
              >
                <Button
                  isIconOnly
                  onClick={() => handleDataClick(fancy_color?.key)}
                  aria-label={fancy_color?.label}
                  variant="solid"
                  color={
                    isDataSelected(fancy_color?.key) ? "primary" : "default"
                  }
                  size="lg"
                  className="transition-transform hover:scale-105"
                >
                  {getFancyColors(fancy_color?.key) ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getFancyColors(fancy_color?.key?.toLowerCase()),
                      }}
                    />
                  ) : (
                    <ImageView
                      data={{
                        image: `/fancy/${fancy_color?.key?.toLowerCase()}.png`,
                      }}
                      // src={`/fancy/${fancy_color?.key?.toLowerCase()}.png`}
                      className="scale-75"
                    />
                  )}
                </Button>
              </Tooltip>
            );
          })}
        </div>
      </ScrollShadow>
    </div>
  );
};

export default FancyColor;
