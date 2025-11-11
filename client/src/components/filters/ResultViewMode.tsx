import { useDiamondSearchApi } from "@/hooks/useDiamondSearchApi";
import { useDiamondSearchFilter } from "@/hooks/useDiamondSearchFilter";
import { Tabs, Tab, Chip, Switch } from "@heroui/react";
import { useEffect } from "react";

const ResultViewMode = ({ activeMode, setActiveMode }) => {
  const { total } = useDiamondSearchApi();
  const { filters, toggleQuickShip } = useDiamondSearchFilter();
  useEffect(() => {
    console.log(filters?.quickShip);
  }, [filters]);

  return (
    <div className="flex border-b border-divider w-full justify-between items-center">
      <Tabs
        aria-label="Options"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 ",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary",
        }}
        selectedKey={activeMode}
        color="primary"
        variant="underlined"
      >
        <Tab
          onClick={() => setActiveMode("diamonds")}
          key="diamonds"
          title={
            <div className="flex items-center space-x-2">
              <span>Diamonds</span>
              <Chip size="sm" variant="faded">
                {total || 0}
              </Chip>
            </div>
          }
        />
        <Tab
          onClick={() => setActiveMode("recentlyView")}
          key="recentlyView"
          title={
            <div className="flex items-center space-x-2">
              <span>Recently View</span>
              <Chip size="sm" variant="faded">
                3
              </Chip>
            </div>
          }
        />
        <Tab
          onClick={() => setActiveMode("compare")}
          key="compare"
          title={
            <div className="flex items-center space-x-2">
              <span>Compare</span>
              <Chip size="sm" variant="faded">
                1
              </Chip>
            </div>
          }
        />
      </Tabs>
      <Switch
        isSelected={filters?.quickShip}
        onClick={toggleQuickShip}
        size="sm"
      >
        Quick Ship
      </Switch>
    </div>
  );
};

export default ResultViewMode;
