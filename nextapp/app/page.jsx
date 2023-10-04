"use client"

import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setProcessedImage(null);
  };

  const handleGenerateBackgroundRemoval = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5050/process-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const imageUrl = URL.createObjectURL(await response.blob());
        setProcessedImage(imageUrl);
      } else {
        console.error('Image processing failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="bg-green-500 text-white py-4 px-8 rounded-t-md w-screen flex justify-center items-center">
        <h1 className="text-5xl rounded-b-md">Ninja Balls Background Remover</h1>
      </header>
      <div className="flex flex-col items-center">
        {selectedFile && (
          <div className="mt-4">
            <p>Selected File: {selectedFile.name}</p>
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" width={300} height={200} />
            <button
              onClick={handleGenerateBackgroundRemoval}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Generate Background Removed Image
            </button>
          </div>
        )}
      </div>
      <Dropzone onDrop={handleFileDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="dropzone-container mt-8 mb-4 p-8 border-dashed border-4 border-gray-400 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <p className="text-lg">Drag & drop an image here, or click to select one</p>
          </div>
        )}
      </Dropzone>

      {processedImage && (
        <div className="mt-4">
          <p>Background Removed Image:</p>
          <img src={processedImage} alt="Processed" width={300} height={200} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
