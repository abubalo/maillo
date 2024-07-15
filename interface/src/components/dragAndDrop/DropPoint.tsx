import React, { useState, useCallback, useRef } from "react";

type FileDropzoneProps = {
  onFilesDrop: (files: File[]) => void;
  acceptedFileTypes: string[];
  multiple?: boolean;
  maxFileSize?: number;
  maxFiles?: number;
  className?: string;
  style?: React.CSSProperties;
};

const DropPoint: React.FC<FileDropzoneProps> = ({
  onFilesDrop,
  acceptedFileTypes,
  maxFileSize = Infinity,
  maxFiles = Infinity,
  className = "",
  style = {},
  multiple = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setError(null);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFiles = useCallback(
    (files: FileList) => {
      const acceptedFiles: File[] = [];
      const errors: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes(file.type)) {
          errors.push(`${file.name}: Unsupported file type.`);
          continue;
        }

        if (file.size > maxFileSize) {
          errors.push(`${file.name}: File is too large.`);
          continue;
        }

        if (acceptedFiles.length >= maxFiles) {
          errors.push(`${file.name}: Too many files.`);
          break;
        }

        acceptedFiles.push(file);

        if (!multiple && acceptedFiles.length === 1) break;
      }

      if (errors.length > 0) {
        setError(errors.join(' '));
      } else {
        setError(null);
        onFilesDrop(acceptedFiles);
      }
    },
    [acceptedFileTypes, maxFileSize, maxFiles, multiple, onFilesDrop]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        processFiles(e.target.files);
      }
    },
    [processFiles]
  );

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section
      className={`file-dropzone ${className} ${isDragging ? "dragging" : ""}`}
      style={{
        border: "2px dashed #ccc",
        borderRadius: "4px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isDragging ? "#f0f0f0" : "transparent",
        ...style,
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        onChange={handleFileInputChange}
        accept={acceptedFileTypes.join(",")}
        multiple={multiple}
        style={{ display: "none" }}
        ref={fileInputRef}
        id="file-input"
      />
      <label htmlFor="file-input">
        {isDragging
          ? "Drop files here"
          : "Drag & drop files here or click to select"}
      </label>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </section>
  );
};

export default DropPoint;
