import Highlighter from "react-highlight-words";

export default function Highlight({ className, content, highlight }) {
  return (
    <Highlighter
      autoEscape
      className={className}
      textToHighlight={content}
      searchWords={[`${highlight}`]}
      highlightStyle={{
        backgroundColor: "transparent",
        fontWeight: "700"
      }}
    />
  );
}
