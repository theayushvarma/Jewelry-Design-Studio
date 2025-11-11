import { useDispatch, useSelector } from "react-redux";
import {
  addRecentlyViewed,
  removeRecentlyViewed,
  clearRecentlyViewed,
} from "@/store/slices/recentlyViewedSlice";
import { RootState } from "@/store";

export const useRecentlyViewed = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.recentlyViewed.items);

  const addItem = (diamond: any) => {
    dispatch(addRecentlyViewed(diamond));
  };

  const removeItem = (certificate_no: string) => {
    dispatch(removeRecentlyViewed(certificate_no));
  };

  const clearAll = () => {
    dispatch(clearRecentlyViewed());
  };

  return {
    items,
    addItem,
    removeItem,
    clearAll,
  };
};
