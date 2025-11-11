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

  const fetchDiamonds = async (filters: any, isLoadMore = false) => {
    try {
      if (isLoadMore) dispatch(fetchMoreStart());
      else dispatch(fetchStart());

      // Default pagination + sorting setup
      const {
        page = 1,
        limit = 10,
        sortBy = "price",
        order = "asc",
        search = "",
        ...otherFilters
      } = filters;

      // Build POST body based on your backend
      const body = {
        page,
        limit,
        sort: { field: sortBy, order },
        filters: otherFilters, // contains color, shape, clarity, etc.
        search,
      };

      // API call — POST request (matches your Express API)
      const response = await api.post("/diamonds", body);

      // Extract data safely
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
      console.error("Error fetching diamonds:", error);
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
