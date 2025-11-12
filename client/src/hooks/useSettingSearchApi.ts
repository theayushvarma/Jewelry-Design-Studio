import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  fetchStart,
  fetchMoreStart,
  fetchSuccess,
  fetchFailure,
  resetData,
  appendData,
} from "@/store/slices/settingSearchApiSlice";
import api from "@/axios";
import { useDiamondRingSelection } from "./useDiamondRingSelection";

export const useSettingSearchApi = () => {
  const dispatch = useDispatch();
  const { diamond } = useDiamondRingSelection();
  const state = useSelector((state: RootState) => state.settingSearchApi);

  const fetchDiamonds = async (filters: any, isLoadMore = false) => {
    try {
      if (isLoadMore) dispatch(fetchMoreStart());
      else dispatch(fetchStart());

      const {
        page = 1,
        limit = 10,
        sortBy = "priceAUD",
        order = "asc",
        search = "",
        ...otherFilters
      } = filters;

      const shape = diamond?.shape;

      const body = {
        page,
        limit,
        sort: { field: sortBy, order },
        filters: { ...otherFilters, shape:shape },
        search,
      };

      const response = await api.post("/settings", body);

      const {
        data = [],
        total = 0,
        page: current_page = 1,
        limit: per_page = limit,
      } = response.data || {};

      const last_page = Math.ceil(total / per_page);

      if (data.length > 0) {
        if (isLoadMore) {
          dispatch(
            appendData({
              data,
              page: current_page,
              total,
              last_page,
              current_page,
            })
          );
        } else {
          dispatch(
            fetchSuccess({
              data,
              total,
              page: current_page,
              last_page,
              current_page,
            })
          );
        }
      } else {
        dispatch(fetchFailure("No Data Found!"));
      }
    } catch (error: any) {
      console.error("Error fetching settings:", error);
      dispatch(fetchFailure(error.message || "Failed to fetch settings data"));
    }
  };

  const reset = () => dispatch(resetData());

  return {
    ...state,
    fetchDiamonds,
    reset,
  };
};
