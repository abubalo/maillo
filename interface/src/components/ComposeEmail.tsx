import { useState, useRef, ChangeEvent } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { motion, AnimatePresence } from "framer-motion";
import Attachment from "./ui/Attachments";
import {
  AttatchmentIcon,
  CloseIcon,
  ExpandIcon,
  MinimizeIcon,
  SendIcon,
} from "./shared/Icons";

interface AttachmentFile {
  name: string;
  file: File;
  type: string;
}

type Props = {
  isDialogOpen: boolean;
  onDialogClose: () => void;
};

const ComposeEmail: React.FC<Props> = ({ isDialogOpen, onDialogClose }) => {
  const [editorMinimize, setEditorMinimize] = useState(false);
  const [editorExpand, setEditorExpand] = useState(false);

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const editorRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditorClose = () => {
    onDialogClose();
  };

  const handleEditorMinimize = () => {
    setEditorMinimize(!editorMinimize);
    setEditorExpand(false);
  };

  const handleEditorExpand = () => {
    setEditorExpand(!editorExpand);
    setEditorMinimize(false);
  };

  const handleEditorChange = (content: string, editor: any) => {
    setBody(content);
    console.log(editor);
    console.log(content);
  };

  const handleAttachment = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newAttachments: AttachmentFile[] = Array.from(e.target.files).map(
        (file) => ({
          name: file.name,
          file: file,
          type: file.type,
        })
      );
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const previewAttachment = (index: number) => {
    // Todo: Implement preview functionality
    console.log("Preview attachment:", attachments[index]);
  };

  console.log(import.meta.env.VITE_TINYMCE_API_KEY);

  return (
    <AnimatePresence>
      {isDialogOpen ? (
        <motion.div
          className={`fixed bottom-0 right-4 w-full ${
            editorExpand ? "max-w-5xl" : "max-w-xl"
          }  bg-white border border-gray-300 rounded-t-lg shadow-lg`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">New Message</h2>
            <div className="flex gap-3">
              <button
                onClick={handleEditorExpand}
                className="text-gray-600 hover:text-gray-800"
              >
                <ExpandIcon size={24} />
              </button>
              <button
                onClick={handleEditorMinimize}
                className="text-gray-600 hover:text-gray-800"
              >
                <MinimizeIcon size={24} />
              </button>
              <button
                onClick={handleEditorClose}
                className="text-gray-600 hover:text-gray-800"
              >
                <CloseIcon size={24} />
              </button>
            </div>
          </div>

          {editorMinimize ? null : (
            <motion.div
              className=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-4 overflow-y-scroll">
                <motion.input
                  type="text"
                  placeholder="To"
                  value={to}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTo(e.target.value)
                  }
                  className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
                <motion.input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSubject(e.target.value)
                  }
                  className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
                <Editor
                  apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount emoticons",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic underline link | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | image | emoticons | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={handleEditorChange}
                />
                <div className="mt-2">
                  <h3 className="mb-1 text-sm font-semibold">Attachments:</h3>
                  <motion.ul
                    className="space-y-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    {attachments.map((attachment, index) => (
                      <Attachment
                        key={index}
                        file={attachment}
                        onRemove={() => removeAttachment(index)}
                        onPreview={() => previewAttachment(index)}
                      />
                    ))}
                  </motion.ul>
                </div>
              </div>

              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-t border-gray-300">
                <button className="flex items-center px-4 py-2 font-semibold text-white transition duration-150 ease-in-out bg-blue-500 rounded-md hover:bg-blue-600">
                  <SendIcon className="mr-2" />
                  Send
                </button>
                <div>
                  <input
                    type="file"
                    multiple
                    onChange={handleAttachment}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-600 transition duration-150 ease-in-out rounded-full hover:text-gray-800 hover:bg-gray-200"
                  >
                    <AttatchmentIcon size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ComposeEmail;
