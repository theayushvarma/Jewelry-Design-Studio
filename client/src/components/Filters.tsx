import React, { useEffect, useState } from "react";
import Shape from "./filters/Shape";
import Cut from "./filters/Cut";
import Lab from "./filters/Lab";
import Polish from "./filters/Polish";
import Table from "./filters/Table";
import Symmetry from "./filters/Symmetry";
import Depth from "./filters/Depth";
import Fluorescence from "./filters/Fluorescence";
import Clarity from "./filters/Clarity";
import Color from "./filters/Color";
import FancyColor from "./filters/FancyColor";
import { Button, Card, CardBody, CardFooter, Divider } from "@heroui/react";
import Carat from "./filters/Carat";
import { Link } from "react-router-dom";
import { useDiamondSearchFilter } from "@/hooks/useDiamondSearchFilter";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useConfig } from "@/hooks/useConfig";
import Price from "./filters/Price";
import SearchByReportNumber from "./filters/SearchByReportNumber";

const CameraIcon = ({ isAdvanceFilterOpen }) => {
  return isAdvanceFilterOpen ? <ChevronUp /> : <ChevronDown />;
};

const Filters = () => {
  const {
    clearFilters,
    filters,
    isAdvanceFilterOpen,
    toggleAdvanceFilter,
    updateFilters,
    isFancyActive,
    toggleFancyActive,
  } = useDiamondSearchFilter();

  const { filterOptions } = useConfig();

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-full mt-1 mb-3"
      shadow="sm"
    >
      <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 ">
        {filterOptions["shape"]?.length && <Shape />}
        {filterOptions["carat"]?.length && <Carat />}

        {filterOptions["color"]?.length && (
          <Color
            isFancyActive={isFancyActive}
            toggleFancyActive={toggleFancyActive}
          />
        )}
        {filterOptions["clarity"]?.length && <Clarity />}
        {filters?.shape?.includes("round") && filterOptions["cut"]?.length && <Cut />}
        {filterOptions["lab"]?.length && <Lab />}
        {filterOptions["priceAUD"]?.length && <Price />}
        <SearchByReportNumber />
      </CardBody>
    </Card>
  );
};

export default Filters;
