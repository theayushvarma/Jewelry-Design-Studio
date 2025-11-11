import DefaultLayout from "@/layouts/default";
import Filters from "@/components/Filters";
import FilterControls from "@/components/common/FilterControls";
import AppliedFilters from "@/components/common/AppliedFilters";
import { useEffect, useMemo, useRef, useState } from "react";
import GridView from "@/components/common/GridView";
import ListView from "@/components/common/ListView";
import { useDiamondSearchFilter } from "@/hooks/useDiamondSearchFilter";
import DiamondDetailModal from "@/components/DiamondDetailModal";
import { useModal } from "@/hooks/useModal";
import { Button } from "@heroui/button";
import useDebouncedFilters from "@/hooks/useDebouncedFilters";
import { generatePayloadFromFilters } from "@/utils/generatePayloadFromFilters";
import { useDiamondSearchApi } from "@/hooks/useDiamondSearchApi";
import { useConfig } from "@/hooks/useConfig";
import { hexToHSL } from "@/utils/common";
import { getFilterLabel } from "@/utils/data";
import BackToFilter from "@/components/common/BackToFilter";
import GlobalToast from "@/hooks/useGlobalToast";
import { ToastProvider } from "@heroui/react";
import useGlobalToast from "@/hooks/useGlobalToast";
import ResultViewMode from "@/components/filters/ResultViewMode";
import CompareGridView from "@/components/common/CompareGridView";
import RecentViewGridView from "@/components/common/RecentViewGridView";
import CompareListView from "@/components/common/CompareListView";
import RecentViewListView from "@/components/common/RecentViewListView";

export default function DiamondPage() {
  const [activeData, setActiveData] = useState({});
  const [activeMode, setActiveMode] = useState("diamonds");
  const { viewType, isFilterOpen, filters } = useDiamondSearchFilter();
  const { isOpen, onClose, onOpen, onOpenChange } = useModal();
  const {
    data,
    error,
    fetchDiamonds,
    loading,
    loadingMore,
    page,
    total,
    hasMore,
    reset,
  } = useDiamondSearchApi();

  const {
    data: configData,
    defaultFilters,
    filterOptions,
    token,
  } = useConfig();

  useEffect(() => {
    if (configData?.colorcode) {
      const hsl = hexToHSL(configData.colorcode);
      const root = document.documentElement;
      root.style.setProperty("--heroui-primary", hsl); // "200 90% 40%" etc
    }
  }, [configData?.colorcode]);

  const debouncedFilters = useDebouncedFilters(filters);

  const basePayload = useMemo(
    () => generatePayloadFromFilters(debouncedFilters, token),
    [debouncedFilters]
  );

  // Fetch on filter change
  useEffect(() => {
    fetchDiamonds({ ...basePayload, page: 1 });
  }, [basePayload]);

  const handleLoadMore = () => {
    if (loading || loadingMore || !hasMore) return;

    const nextPage = page + 1;
    fetchDiamonds({ ...basePayload, page: nextPage }, true);
  };

  const { clearFilters } = useDiamondSearchFilter();

  useEffect(() => {
    if (filterOptions && defaultFilters) {
      clearFilters();
    }
  }, [filterOptions, defaultFilters]);

  const filterRef = useRef(null);

  const [placement, setPlacement] = useState("top-right");

  return (
    <DefaultLayout>
      <DiamondDetailModal
        activeData={activeData}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
      <BackToFilter />
      <ToastProvider placement={placement} toastOffset={20} />
      <section className="flex flex-col items-center justify-center">
        <div id="filter-section"></div>
        {isFilterOpen && <Filters />}
        <FilterControls />
        <ResultViewMode activeMode={activeMode} setActiveMode={setActiveMode} />
        <AppliedFilters />
        <div className="mb-3 md:text-medium text-xs">
          {/*   {loading ? (
            <b className="text-primary">Searching...</b>
          ) : data?.length ? (
            <>
              Showing{" "}
              <b className="text-primary underline underline-offset-2">
                {data?.length} out of {total}
              </b>{" "}
              {!!data[0]?.diamond_type
                ? data[0]?.diamond_type === "L"
                  ? "Lab Grown"
                  : "Natural"
                : ""}{" "}
              Diamonds
            </>
          ) : (
            ""
          )}*/}
        </div>
        {viewType == "grid" ? (
          activeMode == "compare" ? (
            <CompareGridView setActiveData={setActiveData} onOpen={onOpen} />
          ) : activeMode == "recentlyView" ? (
            <RecentViewGridView setActiveData={setActiveData} onOpen={onOpen} />
          ) : (
            <GridView setActiveData={setActiveData} onOpen={onOpen} />
          )
        ) : activeMode == "compare" ? (
          <CompareListView setActiveData={setActiveData} onOpen={onOpen} />
        ) : activeMode == "recentlyView" ? (
          <RecentViewListView setActiveData={setActiveData} onOpen={onOpen} />
        ) : (
          <ListView setActiveData={setActiveData} onOpen={onOpen} />
        )}
        {hasMore && activeMode == "diamonds" ? (
          <div className="col-span-full flex justify-center items-center">
            <Button
              isLoading={loadingMore}
              disabled={loading}
              onClick={handleLoadMore}
              color="primary"
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? "Loading " : "Load More"}
            </Button>
          </div>
        ) : (
          ""
        )}
      </section>
    </DefaultLayout>
  );
}
