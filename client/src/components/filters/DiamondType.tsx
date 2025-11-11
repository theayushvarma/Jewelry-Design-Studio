import useSelection from "@/hooks/useSelectionFilter";
import {
  Tabs,
  Tab,
  ButtonGroup,
  Tooltip,
  Button,
  Divider,
} from "@heroui/react";

export default function DiamondType() {
  const { data, handleDataClick, isDataSelected } =
    useSelection("diamond_type");

  return (
    <div className="w-full flex flex-col max-w-[200px]">
      <ButtonGroup className="w-full">
        {data?.map((type, index) => {
          return (
            <>
              <Tooltip key={index} content={type.label} placement="top">
                <Button
                  onClick={() =>
                    !isDataSelected(type.key) && handleDataClick(type.key)
                  }
                  color={isDataSelected(type.key) ? "primary" : "default"}
                  className="w-full"
                >
                  {type.label}
                </Button>
              </Tooltip>
              {index != data?.length - 1 && (
                <Divider key={`div-${index}`} orientation="vertical" />
              )}
            </>
          );
        })}
      </ButtonGroup>
    </div>
  );
}
