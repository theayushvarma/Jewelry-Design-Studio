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

interface FilterParams {
  token: string;
  diamond_type: string;
  carat: string;
  clarity: string;
  color: string;
  cut: string;
  fluorescence: string;
  lab: string;
  polish: string;
  shape: string;
  symmetry: string;
  page: number;
}

export const useDiamondSearchApi = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.diamondSearchApi);

  const fetchDiamonds = async (filters: FilterParams, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        dispatch(fetchMoreStart());
      } else {
        dispatch(fetchStart());
      }

      const response = await api.post(
        `/wh_search_diamond?page=${filters.page}`,
        filters
      );

      const result = response.data;
      const diamonds = result.data?.data || [];
      const total = result.data?.total || 0;
      const current_page = result.data?.current_page || 1;
      const last_page = result.data?.last_page || 1;

      if (response.data.success) {
        if (isLoadMore) {
          dispatch(
            appendData({
              data: diamonds,
              page: filters.page,
              total: total,
              last_page: last_page,
              current_page: current_page,
            })
          );
        } else {
          if (diamonds?.length) {
            dispatch(
              fetchSuccess({
                data: diamonds,
                total,
                page: filters.page,
                last_page: last_page,
                current_page: current_page,
              })
            );
          } else {
            dispatch(fetchFailure("No Data Found!"));
          }
        }
      } else {
        dispatch(
          fetchFailure(response.data.message || "Failed to fetch diamond data")
        );
      }
    } catch (error: any) {
      if (!error.isCancelled) {
        dispatch(fetchFailure(error.message || "Failed to fetch diamond data"));
      }
    }
  };

  const reset = () => dispatch(resetData());

  return {
    ...state,
    fetchDiamonds,
    reset,
  };
};
