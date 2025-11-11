import { useDiamondSearchApi } from "@/hooks/useDiamondSearchApi";
import { useDiamondSearchFilter } from "@/hooks/useDiamondSearchFilter";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { RootState } from "@/store";
import { Tabs, Tab, Chip, Switch } from "@heroui/react";
import { useSelector } from "react-redux";

const ResultViewMode = ({ activeMode, setActiveMode }) => {
  const { total } = useDiamondSearchApi();
  const { filters, updateFilters } = useDiamondSearchFilter();
  const compareList = useSelector((state: RootState) => state.compare.items);
  const { items } = useRecentlyViewed();

  const handleQuickShipToggle = (isSelected: boolean) => {
    updateFilters({ quickShip: isSelected });
  };

  return (
    <div className="flex mb-3 pb-2 md:pb-0 gap-3 border-b flex-wrap border-divider w-full justify-between items-center">
      <Tabs
        aria-label="Options"
        classNames={{
          tabList: "md:gap-6 gap-1 w-full relative rounded-none p-0",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary",
        }}
        selectedKey={activeMode}
        color="primary"
        variant="underlined"
      >
        <Tab
          key="diamonds"
          title={
            <div
              onClick={() => setActiveMode("diamonds")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <span>Diamonds</span>
              <Chip size="sm" variant="faded">
                {total || 0}
              </Chip>
            </div>
          }
        />
        <Tab
          key="recentlyView"
          title={
            <div
              onClick={() => setActiveMode("recentlyView")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <span>Recently View</span>
              <Chip size="sm" variant="faded">
                {items?.length || 0}
              </Chip>
            </div>
          }
        />
        <Tab
          key="compare"
          title={
            <div
              onClick={() => setActiveMode("compare")}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <span>Compare</span>
              <Chip size="sm" variant="faded">
                {compareList?.length || 0}
              </Chip>
            </div>
          }
        />
      </Tabs>

      <Switch
        isSelected={!!filters?.quickShip}
        onValueChange={handleQuickShipToggle}
        size="sm"
        color="primary"
      >
        Quick Ship
      </Switch>
    </div>
  );
};

export default ResultViewMode;
