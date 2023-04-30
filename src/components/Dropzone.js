import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop }) => {
  const handleDrop = useCallback(acceptedFiles => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

  return (
    <div {...getRootProps()} style={{ border: "2px dashed #ccc", padding: "20px" }}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the audio file here...</p> : <p>Drag and drop an audio file, or click to select</p>}
    </div>
  );
};

export default Dropzone;