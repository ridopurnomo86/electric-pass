import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical";
import { useCallback, useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";

type useToolbarPropsType = {
  editor: LexicalEditor;
};

const useToolbar = ({ editor }: useToolbarPropsType) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsCode(selection.hasFormat("code"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            $updateToolbar();
          });
        })
      ),
    [$updateToolbar, editor]
  );

  const TOOLBAR_DATA = [
    {
      name: "bold",
      icon: "foundation:bold",
      onClick: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold"),
      isActive: isBold,
    },
    {
      name: "italic",
      icon: "foundation:italic",
      onClick: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic"),
      isActive: isItalic,
    },
    {
      name: "underline",
      icon: "foundation:underline",
      onClick: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline"),
      isActive: isUnderline,
    },
    {
      name: "strikethrough",
      icon: "foundation:strikethrough",
      onClick: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough"),
      isActive: isStrikethrough,
    },
    {
      name: "code",
      icon: "fluent:code-block-16-regular",
      onClick: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code"),
      isActive: isCode,
    },
  ];

  return { isBold, isItalic, isStrikethrough, isUnderline, toolbarData: TOOLBAR_DATA };
};

export default useToolbar;
