import {
    MdImage,
    MdOutlinePictureAsPdf
  } from "react-icons/md";
import { GoogleDocIcon, PowerPointIcon } from "../components/shared/Icons";
import { FaPaperclip } from "react-icons/fa";


export const getFileIcon = (type: string) => {
  switch (type) {
    case "application/pdf":
      return <MdOutlinePictureAsPdf className="text-red-500" size={24} />;
    case "application/docx":
    case "application/doc":
      return <GoogleDocIcon className="text-red-500" size={24} />;
    case "application/pptx":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return <PowerPointIcon className="text-red-500" size={24} />;
    case "image/jpeg":
    case "image/png":
    case "image/gif":
      return <MdImage className="text-blue-500" size={24} />;
    default:
      return <FaPaperclip className="mr-2" />;
  }
};
