import { useDiamondSearchFilter } from "@/hooks/useDiamondSearchFilter";
import { Tabs, Tab } from "@heroui/react";
import { AlignJustify, LayoutGrid } from "lucide-react";

const ViewType = () => {
  const { viewType, updateViewType } = useDiamondSearchFilter();

  return (
    <Tabs
      size="lg"
      color="primary"
      selectedKey={viewType}
      onSelectionChange={(key) => updateViewType(key as string)}
      aria-label="Select view type"
      className="flex justify-center items-center"
    >
      <Tab
        key="grid"
        title={
          <div title="Grid View">
            <LayoutGrid />
          </div>
        }
      />
      <Tab
        key="list"
        title={
          <div title="List View">
            <AlignJustify />
          </div>
        }
      />
    </Tabs>
  );
};

export default ViewType;
