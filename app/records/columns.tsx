"use client";
import { EmotionList } from "@/lib/data/emoData";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/table/dataTableColumnHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const filterCards: FilterFn<EmotionList> = (row, columnId, filterValue) => {
  const cards = row.getValue(columnId) as { [key: string]: number }[];
  return cards.some(card => {
    const [name, level] = Object.entries(card)[0];
    return (
      name.toLowerCase().includes(filterValue.toLowerCase()) ||
      level.toString().includes(filterValue)
    );
  });
};

export const columns: ColumnDef<EmotionList>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "create",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    accessorKey: "cards",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emotion and Intensity" />
    ),
    cell: ({ row }) => {
      const cards = row.getValue("cards") as { [key: string]: number }[];
      return (
        <div className="flex items-center justify-start gap-3">
          {cards.map((card, index) => {
            const [name, level] = Object.entries(card)[0];
            return (
              <div key={index}>
                {name}: {level}
              </div>
            );
          })}
        </div>
      );
    },
    filterFn: filterCards,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const emotionList = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(emotionList.id.toString())
              }
            >
              Copy emotion list ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];