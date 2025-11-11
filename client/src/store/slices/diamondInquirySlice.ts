import { createSlice } from "@reduxjs/toolkit";
import api from "@/axios";
import useGlobalToast from "@/hooks/useGlobalToast";

interface InquiryPayload {
  token: string;
  certificate_no: string;
  diamond_type: string;
  name: string;
  email: string;
  message: string;
  mobile: string;
}

interface InquiryState {
  loading: boolean;
  success: boolean;
  message: string;
  error: string | null;
}

const initialState: InquiryState = {
  loading: false,
  success: false,
  message: "",
  error: null,
};

const diamondInquirySlice = createSlice({
  name: "diamondInquiry",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetInquiryState(state) {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setSuccess,
  setMessage,
  setError,
  resetInquiryState,
} = diamondInquirySlice.actions;

export default diamondInquirySlice.reducer;

export const submitDiamondInquiry =
  (payload: InquiryPayload) => async (dispatch) => {
    const { showToast } = useGlobalToast();
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await api.post("/wh_inquiry_diamond", payload);

      dispatch(setLoading(false));
      dispatch(setMessage(res.data.message));

      if (res.data.success) {
        showToast({
          title: "Success",
          description: res.data.message || "Inquiry submitted successfully.",
          variant: "success",
        });
        dispatch(setSuccess(true));
      } else {
        showToast({
          title: "Error",
          description: res.data.message,
          variant: "danger",
        });
        dispatch(setSuccess(false));
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";

      dispatch(setLoading(false));
      dispatch(setSuccess(false));
      dispatch(setError(message));

      showToast({
        title: "Error",
        description: message,
        variant: "danger",
      });
    }
  };
