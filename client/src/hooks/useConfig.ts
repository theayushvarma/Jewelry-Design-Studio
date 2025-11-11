import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store";

export const useConfig = () => {
  const configState = useSelector((state: RootState) => state.config);

  return {
    ...configState,
  };
};
