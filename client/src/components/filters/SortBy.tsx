import useSelection from "@/hooks/useSelectionFilter";
import { Select, SelectItem } from "@heroui/react";
import { useEffect } from "react";

const options = [
  { key: "priceAUD_asc", label: "Price - Low to High" },
  { key: "priceAUD_desc", label: "Price - High to Low" },
  { key: "carat_asc", label: "Carat - Low to High" },
  { key: "carat_desc", label: "Carat - High to Low" },
];

export default function SortBy() {
  const sort_field = useSelection("sort_field");
  const sort_order = useSelection("sort_order");

  const selectedKey = `${sort_field.selected}_${sort_order.selected}`;

  const handleChange = (keys) => {
    const [sortKey] = Array.from(keys); // 'price_asc'
    const [by, order] = sortKey.split("_");

    sort_field.handleDataClick(by); // sets sort_field = "priceAUD"
    sort_order.handleDataClick(order); // sets sort_order = "asc"
  };

  return (
    <Select
      className="w-[200px]"
      size="md"
      title="Sort By"
      selectedKeys={[selectedKey]}
      onSelectionChange={handleChange}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}
