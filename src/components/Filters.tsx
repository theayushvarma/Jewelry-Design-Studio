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

        {isFancyActive
          ? filterOptions["fancy_color"]?.length && (
              <FancyColor
                isFancyActive={isFancyActive}
                toggleFancyActive={toggleFancyActive}
              />
            )
          : filterOptions["color"]?.length && (
              <Color
                isFancyActive={isFancyActive}
                toggleFancyActive={toggleFancyActive}
              />
            )}
        {filterOptions["carat"]?.length && <Carat />}
        {filterOptions["clarity"]?.length && <Clarity />}
        {filterOptions["cut"]?.length && <Cut />}
        {filterOptions["polish"]?.length && <Polish />}
        {filterOptions["symmetry"]?.length && <Symmetry />}

        {isAdvanceFilterOpen && (
          <>
            {filterOptions["fluorescence"]?.length && <Fluorescence />}
            {filterOptions["lab"]?.length && <Lab />}
            {filterOptions["table"]?.length && <Table />}
            {filterOptions["depth"]?.length && <Depth />}
          </>
        )}
      </CardBody>
      <Divider />
      <CardFooter className="justify-center">
        <Button
          onClick={() => toggleAdvanceFilter()}
          color="primary"
          endContent={<CameraIcon isAdvanceFilterOpen={isAdvanceFilterOpen} />}
        >
          {isAdvanceFilterOpen ? "Hide" : "Show"} Advance Filters
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Filters;
