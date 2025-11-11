import { useEffect, useState, useMemo } from "react";
import { useDiamondSearchFilter } from "./useDiamondSearchFilter";
import { useConfig } from "./useConfig";
import { getFilterLabel } from "@/utils/data";

const useSelection = (key) => {
  const { filterOptions = {}, defaultFilters = {} } = useConfig();
  const { filters, updateFilters } = useDiamondSearchFilter();

  const isRangeKey = useMemo(
    () => ["carat", "depth", "table", "price"].includes(key),
    [key]
  );

  const isCategoryRange = useMemo(
    () =>
      [
        "color",
        "clarity",
        "polish",
        "symmetry",
        "fluorescence",
        "cut",
      ].includes(key),
    [key]
  );

  const defaultValue =
    filters[key] ?? defaultFilters[key] ?? (isRangeKey ? [0, 0] : []);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    setSelected(filters[key] ?? defaultFilters[key] ?? defaultValue);
  }, [filters, key, defaultFilters]);

  const data = useMemo(() => {
    return Object.entries(filterOptions[key] || {}).map(([value, label]) => {
      const isString = typeof label === "string";
      return {
        key: label,
        label: isString ? getFilterLabel(label) : label,
      };
    });
  }, [filterOptions, key]);

  const handleRangeChange = (val) => {
    if (isRangeKey) {
      setSelected(val);
      updateFilters({ [key]: val });
    } else if (isCategoryRange) {
      const entries = Object.values(filterOptions[key] || {});
      const newVal = entries.slice(val[0], val[1] + 1);
      setSelected(newVal);
      updateFilters({ [key]: newVal });
    }
  };

  const handleDataClick = (value, allowMultiple = false) => {
    if (Array.isArray(selected)) {
      let newSelection = [];

      if (selected.includes(value)) {
        newSelection = selected.filter((item) => item !== value);
      } else {
        newSelection = allowMultiple ? [...selected, value] : [value];
      }

      setSelected(newSelection);
      updateFilters({ [key]: newSelection });
    } else {
      setSelected(value);
      updateFilters({ [key]: value });
    }
  };

  const isDataSelected = (dataKey) => {
    return Array.isArray(selected)
      ? selected.includes(dataKey)
      : selected === dataKey;
  };

  const clearSelection = () => {
    const cleared = defaultFilters[key] ?? (isRangeKey ? [0, 0] : []);
    setSelected(cleared);
    updateFilters({ [key]: cleared });
  };

  return {
    data,
    selected,
    handleDataClick,
    handleRangeChange,
    isDataSelected,
    clearSelection,
    isRangeKey,
    isCategoryRange,
  };
};

export default useSelection;
