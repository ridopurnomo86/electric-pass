import { $createParagraphNode, $getSelection, $isRangeSelection, LexicalEditor } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, HeadingTagType, $createQuoteNode } from "@lexical/rich-text";
import { INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";

export enum BlockTypeName {
  Bullet = "Bullet List",
  H1 = "Heading 1",
  H2 = "Heading 2",
  H3 = "Heading 3",
  PARAGRAPH = "Normal",
  Quote = "Quote",
}

const formatter = ({ editor, blockType }: { editor: LexicalEditor; blockType: BlockTypeName }) => ({
  formatParagraph: () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  },
  formatHeading: (headingSize: HeadingTagType) => {
    if (!["h1", "h2", "h3"].includes(blockType)) {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      });
    }
  },
  formatBulletList: () => {
    if (blockType !== BlockTypeName.Bullet)
      return editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  },
  formatQuote: () => {
    if (blockType !== BlockTypeName.Quote) {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createQuoteNode());
      });
    }
  },
});

type UseBlockFormatPropsType = {
  editor: LexicalEditor;
  blockType: BlockTypeName;
};

const useBlockFormat = ({ editor, blockType }: UseBlockFormatPropsType) => {
  const BLOCK_FORMAT_DATA = [
    {
      blockType: BlockTypeName.PARAGRAPH,
      type: "normal",
      name: "Normal",
      function: () => formatter({ editor, blockType }).formatParagraph(),
    },
    {
      blockType: BlockTypeName.H1,
      type: "heading1",
      name: "Heading 1",
      function: () => formatter({ editor, blockType }).formatHeading("h1"),
    },
    {
      blockType: BlockTypeName.H2,
      type: "heading2",
      name: "Heading 2",
      function: () => formatter({ editor, blockType }).formatHeading("h2"),
    },
    {
      blockType: BlockTypeName.H3,
      type: "heading3",
      name: "Heading 3",
      function: () => formatter({ editor, blockType }).formatHeading("h3"),
    },
    {
      blockType: BlockTypeName.Bullet,
      type: "bulletList",
      name: "Bullet List",
      function: () => formatter({ editor, blockType }).formatBulletList(),
    },
    {
      blockType: BlockTypeName.Quote,
      type: "quote",
      name: "Quote",
      function: () => formatter({ editor, blockType }).formatQuote(),
    },
  ];

  return { data: BLOCK_FORMAT_DATA };
};

export default useBlockFormat;
