"use client";
import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
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

interface Identifiable {
  id: number;
}

interface DataTableProps<TData extends Identifiable, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// 引入自訂過濾函數
import { filterCards } from "./columns";

export function DataTable<TData extends Identifiable, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // const { t } = useTranslation(["translation", "cards", "category"]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
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
    <div className="flex flex-col flex-grow justify-between h-full">
      <div className="">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emotion and intensity..."
            value={(table.getColumn("cards")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("cards")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DataTableViewOptions table={table} />
        </div>
        <div className="flex flex-col flex-grow min-h-[33.5rem]">
          <div className="flex flex-col rounded-md border h-fit">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
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
                      className="cursor-pointer"
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
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
