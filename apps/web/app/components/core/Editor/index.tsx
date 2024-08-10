import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import ToolbarPlugin from "./Toolbar";
import editorTheme from "./theme";
import LinkPlugin from "./plugin/LinkPlugin";

type EditorPropsType = {
  label: string;
  description: string;
};

function onError(error: Error) {
  console.error(error);
}

const Editor = ({ label, description }: EditorPropsType) => {
  const initialConfig: InitialConfigType = {
    namespace: "Editor",
    theme: editorTheme,
    onError,
    nodes: [ListNode, QuoteNode, ListItemNode, HeadingNode, ...LinkPlugin.nodes],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div>
        <p className="mb-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </p>
        <p className="mb-4 text-sm font-normal text-neutral-600">{description}</p>
        <div>
          <ToolbarPlugin />
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="h-[200px] resize-none space-x-1 overflow-y-scroll rounded-b border bg-transparent px-3 py-1 text-sm caret-slate-200 shadow-sm outline-0 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50" />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <LinkPlugin />
        <ListPlugin />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
};

export default Editor;
