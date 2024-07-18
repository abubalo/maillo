import { MdImage, MdOutlinePictureAsPdf } from "react-icons/md";
import { GoogleDocIcon, PowerPointIcon } from "../components/shared/Icons";
import { FaPaperclip } from "react-icons/fa";

export const GetFileIcon = (type: string) => {
  switch (type) {
    case "application/pdf":
      return <MdOutlinePictureAsPdf className="text-red-500" size={24} />;
    case "application/docx":
    case "application/doc":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <GoogleDocIcon className="text-blue-500" size={24} />;
    case "application/pptx":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return <PowerPointIcon className="text-red-500" size={24} />;
    case "image/jpeg":
    case "image/png":
    case "image/gif":
      return <MdImage className="text-green-600" size={24} />;
    default:
      return <FaPaperclip  className="mr-2 text-purple-600" />;
  }
};
