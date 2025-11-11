import { useDispatch, useSelector } from "react-redux";
import {
  submitShareOnEmail,
  resetShareOnEmailState,
} from "@/store/slices/shareOnEmailSlice";
import { RootState } from "@/store"; 

export const useShareOnEmail = () => {
  const dispatch = useDispatch();

  const shareOnEmailState = useSelector(
    (state: RootState) => state.shareOnEmail
  );

  const submitShare = (data: {
    token: string;
    certificate_no: string;
    diamond_type: string;
    email: string;
  }) => {
    dispatch(submitShareOnEmail(data));
  };

  const resetState = () => {
    dispatch(resetShareOnEmailState());
  };

  return {
    ...shareOnEmailState,
    submitShare,
    resetState,
  };
};
