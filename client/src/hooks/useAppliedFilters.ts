import { useState, useEffect } from "react";
import { useDiamondSearchFilter } from "@/hooks/useDiamondSearchFilter";
import { useConfig } from "./useConfig";

const useAppliedFilters = () => {
  const [appliedFilters, setAppliedFilters] = useState([]);
  const {
    filters = {},
    updateFilters,
    toggleFilter,
    isFilterOpen,
    clearFilters,
  } = useDiamondSearchFilter();
  const { defaultFilters = {} } = useConfig();

  // Utility: Check if two values are equal
  const isEqual = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length && a.every((v, i) => v === b[i]);
    }
    if (typeof a === "object" && typeof b === "object") {
      return JSON.stringify(a) === JSON.stringify(b); // fallback for range-like object
    }
    return a === b;
  };

  const sortByOptions = [
    { key: "priceAUD_asc", label: "Price - Low to High" },
    { key: "priceAUD_desc", label: "Price - High to Low" },
    { key: "carat_asc", label: "Carat - Low to High" },
    { key: "carat_desc", label: "Carat - High to Low" },
  ];

  useEffect(() => {
    const changed = [];

    for (const [key, value] of Object.entries(filters)) {
      const defaultVal = defaultFilters[key];
      if (isEqual(value, defaultVal)) continue;
      if (key == "isFancyActive") {
        continue;
      }

      let displayKey = key;
      let displayValue = "";

      if (Array.isArray(value)) {
        if (value.length === 2 && value.every((v) => typeof v === "number")) {
          displayValue = `${value[0]} - ${value[1]}`;
        } else {
          displayValue = value.join(", ");
        }
      } else if (typeof value === "object" && value !== null) {
        displayValue = `${value.min} - ${value.max}`;
      } else if (
        key === "sort_field" ||
        key === "sort_order" ||
        key === "sort_by"
      ) {
        const tempKey = `${filters.sort_field}_${filters.sort_order}`;
        const result = sortByOptions.find((item) => item.key === tempKey);
        displayKey = "sort_by";
        displayValue = result?.label || "";

        // Remove existing sort-related keys from changed list
        const filtered = changed.filter(
          (item) =>
            item.key !== "sort_by" &&
            item.key !== "sort_field" &&
            item.key !== "sort_order"
        );
        changed.length = 0;
        changed.push(...filtered);
      } else {
        displayValue = value;
      }

      changed.push({ key: displayKey, value: displayValue });
    }

    // Remove 'color' if 'fancy_color' is applied
    if (
      (changed.fancy_color &&
        Array.isArray(changed.fancy_color) &&
        changed.fancy_color.length) ||
      filters.isFancyActive
    ) {
      const index = changed.findIndex((item) => item.key === "color");
      if (index !== -1) changed.splice(index, 1);
    }

    if (
      (changed.color && Array.isArray(changed.color) && changed.color.length) ||
      !filters.isFancyActive
    ) {
      const index = changed.findIndex((item) => item.key === "fancy_color");
      if (index !== -1) changed.splice(index, 1);
    }

    setAppliedFilters(changed);
  }, [filters, defaultFilters]);

  const handleRemoveFilter = (filterKey) => {
    updateFilters({
      ...filters,
      [filterKey]: defaultFilters[filterKey],
    });
  };

  return {
    appliedFilters,
    handleRemoveFilter,
    resetAppliedFilters: clearFilters,
    toggleFilter,
    isFilterOpen,
  };
};

export default useAppliedFilters;
