import useSelectionFilter from "@/hooks/useSelectionFilter";
import { Button, Input, Tooltip } from "@heroui/react";
import LabelTooltip from "@/components/common/LabelTooltip";
import { MailIcon, Search } from "lucide-react";
import { useDiamondSearchFilter } from "@/hooks/useDiamondSearchFilter";

const SearchByReportNumber = () => {
  const { updateFilters, filters } = useDiamondSearchFilter();

  return (
    <div className="w-full space-y-2">
      {/* Label + Tooltip */}
      <LabelTooltip keyName="id" />

      {/* Buttons - Responsive layout */}
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 p-0">
        <Input
          onChange={(e) => updateFilters({ id: e.target.value.trim() })}
          value={filters?.id}
          className="p-0 m-0"
          labelPlacement="outside"
          placeholder="12345678..."
          startContent={
            <Search className="text-2xl text-default-400 pointer-events-none shrink-0" />
          }
          type="text"
        />
      </div>
    </div>
  );
};

export default SearchByReportNumber;
