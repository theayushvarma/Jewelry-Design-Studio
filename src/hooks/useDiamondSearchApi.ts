import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  fetchStart,
  fetchMoreStart,
  fetchSuccess,
  fetchFailure,
  resetData,
  appendData,
} from "@/store/slices/diamondSearchApiSlice";
import api from "@/axios";

export const useDiamondSearchApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.diamondSearchApi);

  const fetchDiamonds = async (
    filters: any,
    isLoadMore = false,
  ) => {
    try {
      if (isLoadMore) dispatch(fetchMoreStart());
      else dispatch(fetchStart());

      // Build query params dynamically
      const params: Record<string, any> = {};

      // Standard params (pagination, filtering, sorting)
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;
      if (filters.search) params.search = filters.search;
      if (filters.filter) params.filter = filters.filter;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.order) params.order = filters.order;

      // Add dynamic fields (like title, completed, color etc.)
      Object.entries(filters).forEach(([key, value]) => {
        if (
          !["page", "limit", "search", "filter", "sortBy", "order"].includes(
            key
          ) &&
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          params[key] = value;
        }
      });

      // API call using your axios instance
      const response = await api.get(
        "/diamonds",
        { params }
      );

      // MockAPI returns array directly
      const diamonds = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      const total = diamonds.length;
      const current_page = filters.page || 1;
      const last_page = filters.limit
        ? Math.ceil(total / (filters.limit || 1))
        : current_page;

      // Handle success
      if (diamonds.length > 0) {
        if (isLoadMore) {
          dispatch(
            appendData({
              data: diamonds,
              page: current_page,
              total,
              last_page,
              current_page,
            })
          );
        } else {
          dispatch(
            fetchSuccess({
              data: diamonds,
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
      dispatch(fetchFailure(error.message || "Failed to fetch diamond data"));
    }
  };

  const reset = () => dispatch(resetData());

  return {
    ...state,
    fetchDiamonds,
    reset,
  };
};
