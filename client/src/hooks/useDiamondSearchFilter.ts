import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store"; // Adjust the path to your redux's root state
import {
  updateView,
  setIsFancyActive,
  toggleFilterOpen,
  toggleAdvanceFilterOpen,
  setFilters,
  resetFilters,
} from "@/store/slices/diamondSearchFilterSlice";
import { useEffect } from "react";

export const useDiamondSearchFilter = () => {
  const dispatch = useDispatch();

  const viewType = useSelector(
    (state: RootState) => state.diamondSearchFilter.viewType
  );
  const isFancyActive = useSelector(
    (state: RootState) => state.diamondSearchFilter.filters.isFancyActive
  );
  const isFilterOpen = useSelector(
    (state: RootState) => state.diamondSearchFilter.isFilterOpen
  );
  const isAdvanceFilterOpen = useSelector(
    (state: RootState) => state.diamondSearchFilter.isAdvanceFilterOpen
  );
  const filters = useSelector(
    (state: RootState) => state.diamondSearchFilter.filters
  );

  const filterOptions = useSelector(
    (state: RootState) => state.config.filterOptions
  );
  const defaultFilters = useSelector(
    (state: RootState) => state.config.defaultFilters
  );

  const toggleFancyActive = (type) => dispatch(setIsFancyActive(type));
  const updateViewType = (type) => dispatch(updateView(type));
  const toggleFilter = () => dispatch(toggleFilterOpen());
  const toggleAdvanceFilter = () => dispatch(toggleAdvanceFilterOpen());
  const updateFilters = (
    payload: Partial<RootState["diamondSearchFilter"]["filters"]>
  ) => dispatch(setFilters(payload));
  const clearFilters = () =>
    dispatch(resetFilters({ filterOptions, defaultFilters }));

  return {
    viewType,
    isFancyActive,
    isFilterOpen,
    isAdvanceFilterOpen,
    filters,
    updateViewType,
    toggleFancyActive,
    toggleFilter,
    toggleAdvanceFilter,
    updateFilters,
    clearFilters,
  };
};
