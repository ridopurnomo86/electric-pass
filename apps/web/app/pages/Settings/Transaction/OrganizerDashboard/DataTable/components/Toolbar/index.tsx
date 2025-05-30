"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Icon } from "@iconify/react";

import ViewOptions from "../ViewOptions";

type ToolbarPropsType<TData> = {
  table: Table<TData>;
};

const Toolbar = <TData,>({ table }: ToolbarPropsType<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter event..."
          value={(table.getColumn("event_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("event_name")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Icon icon="mingcute:close-fill" width="16" height="16" />
          </Button>
        )}
      </div>
      <ViewOptions table={table} />
    </div>
  );
};

export default Toolbar;
