"use client";

import { ColumnDef } from "@tanstack/react-table";
import formatPrice from "~/modules/formatPrice";
import { Task } from "./data/schema";
import ColumnHeader from "./components/ColumnHeader";
import RowActions from "./components/RowActions";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <ColumnHeader column={column} title="Transaction" />,
    cell: ({ row }) => <div className="ml-1 w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "event_name",
    header: ({ column }) => <ColumnHeader column={column} title="Event Name" />,
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("event_name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => <ColumnHeader column={column} title="Total Price" />,
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {formatPrice(row.getValue("total_price"))}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row} />,
  },
];
