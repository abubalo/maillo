import { 
  MdPictureAsPdf, 
  MdImage, 
  MdInsertDriveFile, 
  MdClose,
  MdZoomIn
} from 'react-icons/md';

type FileType = 'application/pdf' | 'image/jpeg' | 'image/png' | 'image/gif' | string;

type File = {
  name: string;
  type: FileType;
}

type AttachmentProps = {
  file: File;
  onRemove: () => void;
  onPreview: () => void;
}

const getFileIcon = (fileType: FileType): JSX.Element => {
  switch (fileType) {
    case 'application/pdf':
      return <MdPictureAsPdf className="text-red-500" size={24} />;
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
      return <MdImage className="text-blue-500" size={24} />;
    default:
      return <MdInsertDriveFile className="text-gray-500" size={24} />;
  }
};

const Attachment: React.FC<AttachmentProps> = ({ file, onRemove, onPreview }) => {
  return (
    <div className="flex items-center justify-between p-2 text-black rounded bg-neutral-500/30">
      <div className="flex items-center space-x-2">
        {getFileIcon(file.type)}
        <span className="text-sm truncate">{file.name}</span>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={onPreview} 
          className="text-blue-500 hover:text-blue-700"
          title="Preview"
        >
          <MdZoomIn size={20} />
        </button>
        <button 
          onClick={onRemove} 
          className="text-red-500 hover:text-red-700"
          title="Remove"
        >
          <MdClose size={20} />
        </button>
      </div>
    </div>
  );
};

export default Attachment;