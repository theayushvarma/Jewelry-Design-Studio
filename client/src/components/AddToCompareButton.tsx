// src/components/AddToCompareButton.tsx
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleCompare } from "@/store/slices/compareSlice";
import { Button, Tooltip } from "@heroui/react";
import { Scale, Check } from "lucide-react";
import { motion } from "framer-motion";

interface AddToCompareButtonProps {
  diamond: {
    id: string | number;
    certificate_no?: string;
    diamond_type?: string;
    [key: string]: any;
  };
  tooltipText?: string;
}

export default function AddToCompareButton({
  diamond,
  tooltipText = "Add to Compare",
}: AddToCompareButtonProps) {
  const dispatch = useDispatch();
  const compareList = useSelector((state: RootState) => state.compare.items);

  const isCompared = compareList.some((item) => item.id === diamond.id);

  const handleToggle = () => {
    dispatch(toggleCompare(diamond));
  };

  return (
    <Tooltip
      content={isCompared ? "Remove from Compare" : tooltipText}
      showArrow
      placement="top"
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Button
          isIconOnly
          variant={isCompared ? "solid" : "flat"}
          color={isCompared ? "success" : "primary"}
          onPress={handleToggle}
          radius="full"
        >
          {isCompared ? <Check size={18} /> : <Scale size={18} />}
        </Button>
      </motion.div>
    </Tooltip>
  );
}
