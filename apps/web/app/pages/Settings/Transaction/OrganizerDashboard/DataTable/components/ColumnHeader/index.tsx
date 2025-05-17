import { Column } from "@tanstack/react-table";
import cn from "~/modules/cn";
import { Button } from "~/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";
import { Icon } from "@iconify/react";

type ColumnHeaderPropsType<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
};

const ColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: ColumnHeaderPropsType<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="data-[state=open]:bg-accent -ml-3 h-8">
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <Icon icon="solar:arrow-down-outline" width="16" height="16" />
            ) : column.getIsSorted() === "asc" ? (
              <Icon icon="solar:arrow-up-outline" width="16" height="16" />
            ) : (
              <Icon icon="solar:alt-arrow-down-outline" width="16" height="16" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <Icon icon="solar:arrow-up-outline" width="16" height="16" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <Icon icon="solar:arrow-down-outline" width="16" height="16" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <Icon icon="tabler:eye-off" width="16" height="16" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ColumnHeader;
