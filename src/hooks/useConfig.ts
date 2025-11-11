// hooks/useConfig.ts
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConfigStart,
  fetchConfigSuccess,
  fetchConfigFailure,
} from "@/store/slices/configSlice";
import { RootState } from "@/store";
import api from "@/axios";

export const useConfig = () => {
  const dispatch = useDispatch();
  const configState = useSelector((state: RootState) => state.config);

  const fetchConfig = async (token: string): Promise<boolean> => {
    try {
      dispatch(fetchConfigStart());
      const response = await api.post("/wh_get_config", { token });

      if (response.data?.success) {
        dispatch(fetchConfigSuccess({ data: response.data.data, token }));
        return true;
      } else {
        dispatch(fetchConfigFailure("Invalid config response"));
        return false;
      }
    } catch (err: any) {
      dispatch(fetchConfigFailure(err.message || "Unexpected error"));
      return false;
    }
  };

  return {
    ...configState,
    fetchConfig,
  };
};
