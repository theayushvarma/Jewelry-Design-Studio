import React, { useEffect, useState, memo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Image,
  Button,
} from "@heroui/react";
import { Eye } from "lucide-react";
import ListViewSkeleton from "../skeleton/ListViewSkeleton";
import { useSelector } from "react-redux";
import { getDiamondShapes } from "@/utils/icons";
import ImageView from "./ImageView";
import { RootState } from "@/store";
import DataNotFound from "./DataNotFound";
import { useConfig } from "@/hooks/useConfig";
import { formatPrice } from "@/utils/common";

interface Column {
  name: string;
  uid: string;
}

interface Diamond {
  certificate_no: string;
  image: string;
  shape: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  polish: string;
  symmetry: string;
  lab: string;
}

const columns: Column[] = [
  { name: "Diamond", uid: "image" },
  { name: "Shape", uid: "shape" },
  { name: "Carat", uid: "carat" },
  { name: "Color", uid: "color" },
  { name: "Clarity", uid: "clarity" },
  { name: "Cut", uid: "cut" },
  { name: "Polish", uid: "polish" },
  { name: "Symmetry", uid: "symmetry" },
  { name: "GIA", uid: "lab" },
  { name: "Action", uid: "certificate_no" },
];

const EyeIcon = memo(() => <Eye size="20px" />);

const SettingListView: React.FC = memo(({ onOpen, setActiveData }) => {
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [imgError, setImgError] = useState<Set<string>>(new Set());
  const { loading, data, error } = useSelector(
    (state: RootState) => state.settingSearchApi
  );

  useEffect(() => {
    if (data?.length) {
      setDiamonds(data);
    }
  }, [data]);

  const { data: configData } = useConfig();

  useEffect(() => {
    if (
      !columns.find((item) => item.uid == "priceAUD") &&
      configData?.display_price == 1
    ) {
      columns.splice(columns.length - 1, 0, {
        name: "Price",
        uid: "priceAUD",
      });
    }
  }, [configData?.display_price]);

  const renderCell = React.useCallback(
    (item: Diamond, columnKey: string) => {
      const cellValue = item[columnKey as keyof Diamond] ?? "N/A"; // Fallback for undefined values

      switch (columnKey) {
        case "image":
          return (
            <div className="h-[40px] w-[40px] object-contain rounded border">
              <ImageView data={item} />
            </div>
          );

        case "priceAUD":
          return configData?.display_price == 1 ? (
            <b>{formatPrice(item?.priceAUD, item?.currency_symbol)}</b>
          ) : (
            ""
          );

        case "lab":
          return (
            <Chip className="capitalize" size="md" variant="flat">
              {cellValue}
            </Chip>
          );

        case "certificate_no":
          return (
            <div className="flex items-center justify-start gap-2">
              <Tooltip content="Details">
                <span
                  onClick={() => {
                    setActiveData(item);
                    onOpen();
                  }}
                  className="text-lg cursor-pointer active:opacity-50"
                >
                  <EyeIcon />
                </span>
              </Tooltip>
            </div>
          );

        default:
          return cellValue;
      }
    },
    [onOpen, imgError]
  );

  if (!diamonds?.length) {
    return (
      <Table aria-label="Diamond table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="start">
              {column.name}
            </TableColumn>
          )}p/
        </TableHeader>
        <TableBody emptyContent={<DataNotFound isImage={false} />}>
          {[]}
        </TableBody>
      </Table>
    );
  }

  return loading || !diamonds.length ? (
    <ListViewSkeleton times={20} />
  ) : (
    <Table className="mb-3" aria-label="Diamond table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align="start">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={diamonds}>
        {(item) => (
          <TableRow key={item.certificate_no} className="border-b">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
});

export default SettingListView;
