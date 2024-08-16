import { OnChangePlugin as CoreOnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";

type OnChangePluginPropsType = {
  onChange: (node: string) => void;
};

const OnChangePlugin = ({ onChange }: OnChangePluginPropsType) => {
  const [editor] = useLexicalComposerContext();

  return (
    <CoreOnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          onChange($generateHtmlFromNodes(editor));
        });
      }}
    />
  );
};

export default OnChangePlugin;
