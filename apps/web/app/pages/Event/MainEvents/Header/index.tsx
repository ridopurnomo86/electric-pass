import { Icon } from "@iconify/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";
import { useSearchParams } from "@remix-run/react";

type HeaderPropsType = {
  totalEvent: number;
};

const Header = ({ totalEvent }: HeaderPropsType) => {
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center justify-between border-b px-10 py-4">
      <div>
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Events List</h1>
        <p className="text-sm text-neutral-600">Book your next availability event.</p>
      </div>
      <div className="flex items-center">
        <p className="mr-4 w-full text-sm text-neutral-600">Results: {totalEvent}</p>
        <Select
          onValueChange={(value) =>
            setSearchParams({
              sortBy: value,
            })
          }
        >
          <SelectTrigger className="gap-2">
            <Icon icon="hugeicons:sorting-05" width="16" height="16" />
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Lastest</SelectItem>
            <SelectItem value="desc">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Header;
