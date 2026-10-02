"use client";

import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";

import {
  compressPdf,
  formatFileSize,
  isPdfFile,
} from "./compressPdf";

import "./compressPdf.css";

export default function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (!isPdfFile(selectedFile)) {
      setError("Please select a PDF file.");
      return;
    }

    setFile(selectedFile);
    setCompressedSize(null);
    setError(null);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const openFilePicker = () => {
    if (!isCompressing) {
      inputRef.current?.click();
    }
  };

  const removeFile = () => {
    if (isCompressing) {
      return;
    }

    setFile(null);
    setCompressedSize(null);
    setError(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleCompress = async () => {
    if (!file || isCompressing) {
      return;
    }

    setIsCompressing(true);
    setCompressedSize(null);
    setError(null);

    try {
      const result = await compressPdf(file);

      setCompressedSize(result.size);

      const url = URL.createObjectURL(result.blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${file.name.replace(/\.pdf$/i, "")}-compressed.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (compressionError) {
      const message =
        compressionError instanceof Error
          ? compressionError.message
          : "PDF compression failed.";

      setError(message);
    } finally {
      setIsCompressing(false);
    }
  };

  const compressionPercentage =
    file && compressedSize !== null && file.size > 0
      ? Math.max(
          0,
          ((file.size - compressedSize) / file.size) * 100
        )
      : null;

  return (
    <main className="compress-pdf-page">
      <section className="compress-pdf-hero">
        <a href="/" className="compress-pdf-back">
          ← Back to Utility
        </a>

        <div className="compress-pdf-heading">
          <span className="compress-pdf-eyebrow">
            PDF Tool
          </span>

          <h1>Compress PDF</h1>

          <p>
            Reduce the size of your PDF while keeping it clear and easy to use.
          </p>
        </div>

        <div
          className={`compress-pdf-dropzone ${
            isDragging ? "is-dragging" : ""
          } ${file ? "has-file" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={!file ? openFilePicker : undefined}
          role={!file ? "button" : undefined}
          tabIndex={!file ? 0 : undefined}
          onKeyDown={(event) => {
            if (!file && (event.key === "Enter" || event.key === " ")) {
              openFilePicker();
            }
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleInputChange}
            hidden
          />

          {!file ? (
            <>
              <div className="compress-pdf-icon">↑</div>

              <h2>Drop your PDF here</h2>

              <p>or click to browse your files</p>

              <span className="compress-pdf-hint">
                PDF files only
              </span>
            </>
          ) : (
            <div className="compress-pdf-file">
              <div className="compress-pdf-file-icon">
                PDF
              </div>

              <div className="compress-pdf-file-info">
                <strong>{file.name}</strong>
                <span>{formatFileSize(file.size)}</span>
              </div>

              <button
                type="button"
                className="compress-pdf-remove"
                onClick={(event) => {
                  event.stopPropagation();
                  removeFile();
                }}
                aria-label="Remove selected PDF"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {file && (
          <button
            type="button"
            className="compress-pdf-button"
            onClick={handleCompress}
            disabled={isCompressing}
          >
            {isCompressing ? "Compressing..." : "Compress PDF"}
          </button>
        )}

        {compressedSize !== null && file && (
          <div className="compress-pdf-result">
            <strong>Compression complete</strong>

            <span>
              {formatFileSize(file.size)} → {formatFileSize(compressedSize)}
            </span>

            {compressionPercentage !== null && (
              <span>
                {compressionPercentage.toFixed(1)}% smaller
              </span>
            )}
          </div>
        )}

        {error && (
          <p className="compress-pdf-error">
            {error}
          </p>
        )}

        <p className="compress-pdf-privacy">
          Your files are only used for the compression process.
        </p>
      </section>
    </main>
  );
}