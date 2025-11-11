import { useDispatch, useSelector } from "react-redux";
import {
  submitDiamondInquiry,
  resetInquiryState,
} from "@/store/slices/diamondInquirySlice";
import { RootState } from "@/store"; // update path if needed

export const useDiamondInquiry = () => {
  const dispatch = useDispatch();

  const inquiryState = useSelector((state: RootState) => state.diamondInquiry);

  const submitInquiry = (data: {
    token: string;
    certificate_no: string;
    diamond_type: string;
    name: string;
    email: string;
    message: string;
    mobile: string;
  }) => {
    dispatch(submitDiamondInquiry(data));
  };

  const resetState = () => {
    dispatch(resetInquiryState());
  };

  return {
    ...inquiryState,
    submitInquiry,
    resetState,
  };
};
