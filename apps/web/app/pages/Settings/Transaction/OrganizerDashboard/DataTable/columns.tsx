"use client";

import { ColumnDef } from "@tanstack/react-table";
import formatPrice from "~/modules/formatPrice";
import dayjs from "dayjs";
import { Task } from "./data/schema";
import ColumnHeader from "./components/ColumnHeader";

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
    accessorKey: "order_date",
    header: ({ column }) => <ColumnHeader column={column} title="Order Date" />,
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {dayjs(row.getValue("order_date")).format("MMM DD, mm:ss A")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "payment_method",
    header: ({ column }) => <ColumnHeader column={column} title="Payment" />,
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("payment_method")}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("status")}</span>
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
];
