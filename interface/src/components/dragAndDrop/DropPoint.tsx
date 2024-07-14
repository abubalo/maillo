import React, { useState, useCallback } from "react";

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

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
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

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (
          acceptedFileTypes.length === 0 ||
          acceptedFileTypes.includes(file.type)
        ) {
          if (file.size <= maxFileSize && acceptedFiles.length < maxFiles) {
            acceptedFiles.push(file);
          }
        }

        if (!multiple && acceptedFiles.length === 1) break;
      }

      onFilesDrop(acceptedFiles);
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

  return (
    <section
      className={`file-dropzone ${className} ${isDragging ? "dragging" : ""}`}
      style={{
        border: "2px dashed #ccc",
        borderRadius: "4px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        ...style,
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={handleFileInputChange}
        accept={acceptedFileTypes.join(",")}
        multiple={multiple}
        style={{ display: "none" }}
        id="file-input"
      />
      <label htmlFor="file-input">
        {isDragging
          ? "Drop files here"
          : "Drag & drop files here or click to select"}
      </label>
    </section>
  );
};

export default DropPoint;
