import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableHeadSelect } from "./table-head-select";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";


type Props = {
  headers: string[];
  body: string[][];
  selectedColumns: Record<string, string | null>;
  onTableHeadSelectChange: (columnIndex: number, value: string | null)  => void;
};

export const ImportTable = ({
  headers,
  body,
  selectedColumns,
  onTableHeadSelectChange,
}: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: body.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Estimate row height
    overscan: 5,
  });

  return (
    <div 
      ref={parentRef}
      className="rounded-md overflow-auto border h-[500px]"
    >
      <Table className="grid w-max min-w-full">
        <TableHeader className="bg-muted sticky top-0 z-10 grid">
          <TableRow className="flex w-full">
            {headers.map((_item, index) => (
              <TableHead key={index} className="w-[200px] flex-shrink-0">
                <TableHeadSelect
                  columnIndex={index}
                  selectedColumns={selectedColumns}
                  onChange={onTableHeadSelectChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody 
          className="grid relative"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = body[virtualRow.index];
            return (
              <TableRow
                key={virtualRow.index}
                className="absolute top-0 left-0 flex w-full"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                  height: `${virtualRow.size}px`
                }}
              >
                {row.map((cell, index) => (
                  <TableCell key={index} className="w-[200px] flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

