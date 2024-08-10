import { Icon } from "@iconify/react";
import cn from "~/modules/cn";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import BlockFormatPlugin from "../plugin/BlockFormatPlugin";
import useToolbar from "./useToolbar";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const { toolbarData } = useToolbar({ editor });

  return (
    <div className="flex w-full items-center gap-2 overflow-x-scroll rounded-t border border-b-0 bg-transparent p-2">
      <BlockFormatPlugin editor={editor} />
      {toolbarData.map((item) => (
        <button
          key={item.name}
          className={cn(
            "p-2 transition-colors duration-100 ease-in hover:bg-neutral-100 rounded",
            item.isActive ? "bg-neutral-100" : "bg-transparent"
          )}
          onClick={item.onClick}
        >
          <Icon icon={item.icon} className="size-5 text-neutral-600" />
        </button>
      ))}
    </div>
  );
};

export default ToolbarPlugin;
