import { useEffect, useRef, useState } from "react";
import { Slider, NumberInput } from "@heroui/react";
import useSelectionFilter from "@/hooks/useSelectionFilter";
import { useConfig } from "@/hooks/useConfig";
import { getFilterLabel } from "@/utils/data";

const RangeSlider = ({ keyName, resetSignal }) => {
  const { filterOptions } = useConfig();
  const rawData = filterOptions?.[keyName];

  const { selected, handleRangeChange, isRangeKey, isCategoryRange } =
    useSelectionFilter(keyName);

  const min = isRangeKey && Array.isArray(rawData) ? rawData[0] : 0;
  const max =
    isRangeKey && Array.isArray(rawData)
      ? rawData[1]
      : Object.keys(rawData).length - 1;

  const step = keyName == "price" ? 100 :  isRangeKey ? 0.1 : 1;

  const [range, setRange] = useState([min, max]);
  const [marks, setMarks] = useState([]);
  const isSingleValue = isCategoryRange
    ? Array.isArray(rawData) && rawData.length === 1
    : false;

  // inside your component
  const isManualChangeRef = useRef(false);

  // When user changes range manually
  const handleSliderChange = (val) => {
    if (!isSingleValue) {
      isManualChangeRef.current = true;
      setRange(val);
      handleRangeChange(val);
    }
  };

  const handleMinChange = (val) => {
    let parsed = parseFloat(val);
    if (!isNaN(parsed) && !isSingleValue) {
      isManualChangeRef.current = true;
      if (parsed <= rawData[0]) parsed = rawData[0];
      else if (parsed >= range[1]) parsed = range[1];
      const newRange = [parsed, range[1]];
      setRange(newRange);
      handleRangeChange(newRange);
    }
  };

  const handleMaxChange = (val) => {
    let parsed = parseFloat(val);
    if (!isNaN(parsed) && !isSingleValue) {
      isManualChangeRef.current = true;
      if (parsed >= rawData[1]) parsed = rawData[1];
      else if (parsed <= range[0]) parsed = range[0];
      const newRange = [range[0], parsed];
      setRange(newRange);
      handleRangeChange(newRange);
    }
  };

  // Effect to sync with store-selected only when not changed manually
  useEffect(() => {
    if (!rawData) return;

    if (isManualChangeRef.current) {
      isManualChangeRef.current = false;
      return;
    }

    let newRange = [min, max];

    if (isRangeKey && selected?.min != null && selected?.max != null) {
      newRange = [selected.min, selected.max];
    } else if (
      isCategoryRange &&
      Array.isArray(selected) &&
      selected.length === 1
    ) {
      const keys = Object.keys(rawData);
      const idx = keys.findIndex((k) => k === selected[0]);
      newRange = [idx, idx]; // Center on single value
    } else if (isCategoryRange && Array.isArray(selected)) {
      const keys = Object.keys(rawData);
      const startIdx = keys.findIndex((k) => k === selected[0]);
      const endIdx = keys.findIndex((k) => k === selected[selected.length - 1]);
      newRange = [
        startIdx === -1 ? 0 : startIdx,
        endIdx === -1 ? keys.length - 1 : endIdx,
      ];
    }

    setRange(newRange);
  }, [selected, rawData, min, max]);

  // On mount: set initial selected values
  useEffect(() => {
    if (isRangeKey && selected?.min != null && selected?.max != null) {
      setRange([selected.min, selected.max]);
    } else if (
      isCategoryRange &&
      Array.isArray(selected) &&
      selected.length === 1
    ) {
      const keys = Object.keys(rawData);
      const idx = keys.findIndex((k) => k === selected[0]);
      setRange([idx, idx]); // Center on single value
    } else if (isCategoryRange && Array.isArray(selected)) {
      const keys = Object.keys(rawData);
      const startIdx = keys.findIndex((k) => k === selected[0]);
      const endIdx = keys.findIndex((k) => k === selected[selected.length - 1]);
      setRange([
        startIdx === -1 ? 0 : startIdx,
        endIdx === -1 ? keys.length - 1 : endIdx,
      ]);
    } else {
      setRange([min, max]);
    }
  }, [keyName]);

  // Generate slider marks
  useEffect(() => {
    if (isRangeKey && Array.isArray(rawData)) {
      const generatedMarks = [];
      const interval = Math.ceil((max - min) / 4);
      for (let i = min; i <= max; i += interval) {
        generatedMarks.push({
          value: parseFloat(i.toFixed(1)),
          label: `${i.toFixed(1)}`,
        });
      }
      setMarks(generatedMarks);
    } else {
      const keys = Object.values(rawData);
      setMarks(keys.map((k, i) => ({ value: i, label: getFilterLabel(k) })));
    }
  }, [keyName, rawData]);

  const showInputs = isRangeKey && !isSingleValue;

  return (
    <div className="flex flex-col gap-3">
      <Slider
        minValue={min}
        maxValue={max}
        step={step}
        value={range}
        onChange={handleSliderChange}
        marks={showInputs ? null : marks}
        size="sm"
        showSteps={!showInputs}
        showTooltip={showInputs}
        tooltipProps={{ offset: 5, placement: "top" }}
        disabled={isSingleValue}
      />

      {showInputs && (
        <div className="w-full h-7 flex items-center justify-between gap-3">
          <NumberInput
            className="max-w-[120px] scale-75"
            value={range[0]}
            onValueChange={handleMinChange}
            size="sm"
            step={step}
            min={min}
            max={range[1]}
            placeholder={`Min ${keyName}`}
            disabled={isSingleValue}
          />
          <NumberInput
            className="max-w-[120px] scale-75"
            value={range[1]}
            onValueChange={handleMaxChange}
            size="sm"
            step={step}
            min={range[0]}
            max={max}
            placeholder={`Max ${keyName}`}
            disabled={isSingleValue}
          />
        </div>
      )}
    </div>
  );
};

export default RangeSlider;
