"use client";
import React, { useState, useCallback, useMemo } from "react";
import { filterCards } from "./columns";
// import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { DatePickerWithRange } from "@/components/ui/datePickerWithRange";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/table/dataTablePagination";
import { DataTableViewOptions } from "@/components/table/dataTableViewOptions";
import {
  Row,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateRange } from "react-day-picker";

interface Identifiable {
  id: number;
  create: string | Date;
}

interface DataTableProps<TData extends Identifiable, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends Identifiable, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDateRangeChange = useCallback((range: DateRange | undefined) => {
    setDateRange(range);
  }, []);

  const filteredData = useMemo(() => {
    if (!dateRange || !dateRange.from || !dateRange.to) return data;
    return data.filter((item) => {
      const itemDate = new Date(item.create);
      return itemDate >= dateRange.from! && itemDate <= dateRange.to!;
    });
  }, [data, dateRange]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    filterFns: {
      cards: filterCards,
    },
  });

  const handleRowClick = (row: Row<TData>) => {
    console.log("資料的 ID:", row.original.id);
  };

  return (
    <div className={cn("flex flex-col flex-grow justify-between h-full")}>
      <div>
        <div className={cn("flex items-center justify-between py-4")}>
          <DatePickerWithRange onDateRangeChange={handleDateRangeChange} />
          <Input
            placeholder="Filter emotion and intensity..."
            value={(table.getColumn("cards")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("cards")?.setFilterValue(event.target.value)
            }
            className={cn("max-w-xs")}
          />
          <DataTableViewOptions table={table} />
        </div>
        <div className={cn("flex flex-col flex-grow min-h-[33.5rem]")}>
          <div className={cn("flex flex-col rounded-md border h-fit")}>
            <Table>
              <TableHeader className={cn("bg-[#91d6e2] dark:bg-[#348897] dark:text-white")}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className={cn("text-white")}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={cn("cursor-pointer")}
                      onClick={() => handleRowClick(row)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className={cn("h-24 text-center")}
                    >
                      無結果。
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div className={cn("pt-5")}>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
