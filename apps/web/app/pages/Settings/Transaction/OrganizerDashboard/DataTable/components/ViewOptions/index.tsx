"use client";

import { Icon } from "@iconify/react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Button } from "~/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/DropdownMenu";

type ViewOptionsPropsType<TData> = {
  table: Table<TData>;
};

const ViewOptions = <TData,>({ table }: ViewOptionsPropsType<TData>) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
        <Icon icon="lucide:settings-2" width="16" height="16" className="mr-2" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[150px]">
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {table
        .getAllColumns()
        .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
        .map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            className="capitalize"
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
          >
            {column.id.split("_").join(" ")}
          </DropdownMenuCheckboxItem>
        ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default ViewOptions;
