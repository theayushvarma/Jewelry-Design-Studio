import React, { useCallback, memo, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
} from "@heroui/react";
import GridViewSkeleton from "../skeleton/GridViewSkeleton";
import { useSelector } from "react-redux";
import DataNotFound from "./DataNotFound";
import ImageView from "./ImageView";
import { useDiamondSearchFilter } from "@/hooks/useDiamondSearchFilter";
import { RootState } from "@/store";
import { formatPrice } from "@/utils/common";
import { useConfig } from "@/hooks/useConfig";
import { useDiamondRingSelection } from "@/hooks/useDiamondRingSelection";

// Define TypeScript interfaces
interface Diamond {
  certificate_no: string;
  carat: number;
  color: string;
  clarity: string;
  shape: string;
  lab: string;
}

interface GridViewProps {
  onOpen: () => void;
  setActiveData: (data: Diamond) => void;
}

// Optimized GridView component
const SettingGridView: React.FC<GridViewProps> = memo(
  ({ onOpen, setActiveData }) => {
    const { loading, data, error } = useSelector(
      (state: RootState) => state.settingSearchApi
    );
    const { toggleFilter } = useDiamondSearchFilter();
    const { addSetting } = useDiamondRingSelection();

    // Memoize getDiamondTitle to avoid recreating the function
    const getDiamondTitle = useCallback((diamond: Diamond) => {
      return `${diamond.carat} Carat · ${diamond.color} · ${diamond.clarity} · ${diamond.shape}`;
    }, []);

    const { data: configData } = useConfig();

    // Determine the rendering state
    if (loading) {
      return <GridViewSkeleton times={20} />;
    }

    if (!data?.length) {
      return <DataNotFound />;
    }

    return (
      <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-3">
        {data.map((item) => (
          <Card
            key={item.certificate_no}
            isPressable
            shadow="md"
            onPress={onOpen}
            onClick={() => setActiveData(item)}
            className="w-full"
            role="button"
            aria-label={`View details for ${getDiamondTitle(item)}`}
          >
            <CardBody className="relative overflow-hidden p-0 flex justify-center items-center">
              <div className="h-[296px] w-full">
                <ImageView data={item} />
              </div>
              {/* <Chip className="absolute top-2 right-2 z-10" variant="flat">
                {item.lab}
              </Chip> */}
            </CardBody>
            <Divider />
            <CardFooter className="flex flex-col justify-between items-center p-3">
              <h3 className="text-md font-semibold">{item.title}</h3>
              {configData?.display_price == 1 && (
                <b> {formatPrice(item?.price, item?.currency_symbol)}</b>
              )}
              <Button
                fullWidth
                className="w-full mt-2"
                isIconOnly
                variant="solid"
                // onPress={copyLink}
                aria-label="Copy video link"
                color="primary"
                onClick={() => addSetting(item)}
              >
                Choose this setting
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
);

export default SettingGridView;
