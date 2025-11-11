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
import SettingGridView from "@/components/common/SettingGridView";
import SettingListView from "@/components/common/SettingListView";
import SettingFilterControls from "@/components/common/SettingFilterControls";
import { useSettingSearchApi } from "@/hooks/useSettingSearchApi";

export default function SettingPage() {
  const [activeData, setActiveData] = useState({});
  const { viewType } = useDiamondSearchFilter();
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
  } = useSettingSearchApi();

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
      root.style.setProperty("--heroui-primary", hsl); 
    }
  }, [configData?.colorcode]);

  useEffect(() => {
    fetchDiamonds({ page: 1 });
  }, []);

  const handleLoadMore = () => {
    if (loading || loadingMore || !hasMore) return;

    const nextPage = page + 1;
    fetchDiamonds({ page: nextPage }, true);
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
      <ToastProvider placement={placement} toastOffset={20} />
      <section className="flex flex-col items-center justify-center">
        <div id="filter-section"></div>
        <div className="mb-3 md:text-medium text-xs">
        </div>
        <SettingGridView setActiveData={setActiveData} onOpen={onOpen} />

        {hasMore ? (
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
