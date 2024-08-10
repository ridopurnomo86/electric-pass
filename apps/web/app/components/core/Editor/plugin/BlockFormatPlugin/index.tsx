import { LexicalEditor } from "lexical";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";
import { useState } from "react";
import { Button } from "~/components/ui/Button";
import useBlockFormat, { BlockTypeName } from "./useBlockFormat";

type BlockFormatPlugin = {
  editor: LexicalEditor;
};

const BlockFormatPlugin = ({ editor }: BlockFormatPlugin) => {
  const [statusBar, setStatusBar] = useState("Normal");
  const [blockerType, setBlockerType] = useState<BlockTypeName>(BlockTypeName.PARAGRAPH);

  const { data } = useBlockFormat({ blockType: blockerType, editor });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="outline-none">
          {statusBar}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {data.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.name}
            checked={statusBar === item.name}
            onCheckedChange={() => setStatusBar(item.name)}
            onClick={() => {
              item.function();
              setBlockerType(item.blockType);
              setStatusBar(item.name);
            }}
          >
            <p>{item.name}</p>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BlockFormatPlugin;
