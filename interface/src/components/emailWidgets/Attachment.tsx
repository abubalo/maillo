import { Link } from "react-router-dom";
import { Attachment } from "../../types";
import { getFileIcon } from "../../utils/getFileIcon";

const Attachments: React.FC<{ attachments: Attachment[] }> = ({
  attachments,
}) => {
  return (
    <div className="">
      <div className="flex flex-wrap gap-2">
        {attachments.map((attachment) => (
          <Link
            key={attachment.id}
            to={attachment.url}
            className="flex items-center p-2 transition-colors border border-gray-300 rounded-md"
            download
          >
            {getFileIcon(attachment.type)}
            <span>{attachment.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Attachments;
