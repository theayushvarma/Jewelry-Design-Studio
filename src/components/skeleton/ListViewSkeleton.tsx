import { useConfig } from "@/hooks/useConfig";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from "@heroui/react";
import { useMemo } from "react";

export default function ListViewSkeleton({ times = 5 }) {
  const { data: configData } = useConfig();

  const columns = useMemo(() => {
    const baseColumns = [
      { name: "Diamond", uid: "image" },
      { name: "Shape", uid: "shape" },
      { name: "Carat", uid: "carat" },
      { name: "Color", uid: "color" },
      { name: "Clarity", uid: "clarity" },
      { name: "Cut", uid: "cut" },
      { name: "Polish", uid: "polish" },
      { name: "Symmetry", uid: "symmetry" },
      { name: "GIA", uid: "lab" },
    ];

    if (configData?.display_price === 1) {
      baseColumns.push({ name: "Price", uid: "net_price" });
    }

    baseColumns.push({ name: "Action", uid: "certificate_no" });

    return baseColumns;
  }, [configData?.display_price]);

  const getSkeletonCell = (uid) => {
    if (uid === "image") {
      return (
        <TableCell key={uid}>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-md animate-pulse" />
          </div>
        </TableCell>
      );
    }

    if (uid === "certificate_no") {
      return (
        <TableCell key={uid}>
          <div className="flex justify-center">
            <Skeleton className="h-6 w-6 rounded-full animate-pulse" />
          </div>
        </TableCell>
      );
    }

    return (
      <TableCell key={uid}>
        <Skeleton className="h-6 w-16 rounded-full animate-pulse" />
      </TableCell>
    );
  };

  return (
    <Table aria-label="Skeleton table for loading state">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align="start">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {Array.from({ length: times }).map((_, index) => (
          <TableRow key={index} className="border-b">
            {columns.map((col) => getSkeletonCell(col.uid))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
