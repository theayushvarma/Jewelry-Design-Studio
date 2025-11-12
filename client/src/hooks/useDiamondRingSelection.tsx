import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  selectDiamond,
  removeDiamond,
  selectSetting,
  removeSetting,
  loadSelections,
  clearSelections,
} from "@/store/slices/diamondRingSelectionSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useDiamondRingSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { diamond, setting } = useSelector(
    (state: RootState) => state.diamondRingSelection
  );

  const addDiamond = (data: any) => {
    dispatch(selectDiamond(data));
    if (!!setting && Object.keys(setting)?.length) {
      const matchingShapes = setting?.shape?.split(",")
      const dShape = data?.shape
      if (matchingShapes.includes(dShape.toLowerCase())) {
        navigate("/ring");
      }else{
        removeSettingSelection()
      }
    } else {
      navigate("/settings");
    }
  };

  const removeDiamondSelection = () => {
    navigate("/diamonds");
    dispatch(removeDiamond());
  };

  const addSetting = (data: any) => {
    dispatch(selectSetting(data));

    if (!!diamond && Object.keys(diamond)?.length) {
      navigate("/ring");
    } else {
      navigate("/diamonds");
    }
  };
  const removeSettingSelection = () => {
    dispatch(removeSetting());
    navigate("/settings");
  };

  const clearAllSelections = () => {
    dispatch(clearSelections());
    navigate("/diamonds");
  };

  return {
    diamond,
    setting,
    addDiamond,
    removeDiamondSelection,
    addSetting,
    removeSettingSelection,
    clearAllSelections,
  };
};
