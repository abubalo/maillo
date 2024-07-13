import { useState, useRef, useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaLink,
  FaHeading,
  FaParagraph,
} from "react-icons/fa";
import "./style.css";

interface ToolbarProps {
  onCommand: (command: string, value?: string) => void;
  activeStyles: string[];
}

interface LinkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string, text: string) => void;
}

const LinkDialog: React.FC<LinkDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  if (!isOpen) return null;

  return (
    <div className="link-dialog">
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="bg-transparent"
      />
      <input
        type="text"
        placeholder="Link text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-transparent"
      />
      <button
        onClick={() => {
          onSubmit(url, text);
          onClose();
        }}
      >
        Insert
      </button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

const Toolbar: React.FC<ToolbarProps> = ({ onCommand, activeStyles }) => (
  <div className="toolbar">
    <button
      onClick={() => onCommand("bold")}
      className={activeStyles.includes("bold") ? "active" : ""}
    >
      <FaBold />
    </button>
    <button
      onClick={() => onCommand("italic")}
      className={activeStyles.includes("italic") ? "active" : ""}
    >
      <FaItalic />
    </button>
    <button
      onClick={() => onCommand("underline")}
      className={activeStyles.includes("underline") ? "active" : ""}
    >
      <FaUnderline />
    </button>
    <button
      onClick={() => onCommand("strikeThrough")}
      className={activeStyles.includes("strikethrough") ? "active" : ""}
    >
      <FaStrikethrough />
    </button>
    <button onClick={() => onCommand("justifyLeft")}>
      <FaAlignLeft />
    </button>
    <button onClick={() => onCommand("justifyCenter")}>
      <FaAlignCenter />
    </button>
    <button onClick={() => onCommand("justifyRight")}>
      <FaAlignRight />
    </button>
    <button onClick={() => onCommand("justifyFull")}>
      <FaAlignJustify />
    </button>
    <button onClick={() => onCommand("createLink")}>
      <FaLink />
    </button>
    <button onClick={() => onCommand("formatBlock", "<h1>")}>
      <FaHeading />
    </button>
    <button onClick={() => onCommand("formatBlock", "<h2>")}>H2</button>
    <button onClick={() => onCommand("formatBlock", "<p>")}>
      <FaParagraph />
    </button>
  </div>
);

interface EditorProps {
  toolbarPosition?: "top" | "bottom";
}

const Editor: React.FC<EditorProps> = ({ toolbarPosition = "top" }) => {
  const [content, setContent] = useState<string>("");
  const [activeStyles, setActiveStyles] = useState<string[]>([]);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  console.log(content);

  const handleCommand = (command: string, value: string = ""): void => {
    if (command === "createLink") {
      setIsLinkDialogOpen(true);
    } else {
      document.execCommand(command, false, value);
      updateActiveStyles();
    }
    editorRef.current?.focus();
  };

  const handleChange = (): void => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
      updateActiveStyles();
    }
  };

  const updateActiveStyles = (): void => {
    const styles: string[] = [];
    if (document.queryCommandState("bold")) styles.push("bold");
    if (document.queryCommandState("italic")) styles.push("italic");
    if (document.queryCommandState("underline")) styles.push("underline");
    if (document.queryCommandState("strikeThrough"))
      styles.push("strikethrough");
    setActiveStyles(styles);
  };

  const handleInsertLink = (url: string, text: string): void => {
    document.execCommand("insertHTML", false, `<a href="${url}">${text}</a>`);
    updateActiveStyles();
  };

  return (
    <div className="editor-container">
      {toolbarPosition === "top" && (
        <Toolbar onCommand={handleCommand} activeStyles={activeStyles} />
      )}
      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        onInput={handleChange}
        onKeyUp={updateActiveStyles}
        onMouseUp={updateActiveStyles}
      />
      {toolbarPosition === "bottom" && (
        <Toolbar onCommand={handleCommand} activeStyles={activeStyles} />
      )}
      <LinkDialog
        isOpen={isLinkDialogOpen}
        onClose={() => setIsLinkDialogOpen(false)}
        onSubmit={handleInsertLink}
      />
    </div>
  );
};

export default Editor;
