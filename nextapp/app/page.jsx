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
      const response = await fetch('http://loaclhost:5050/process-image', {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl text-[var(--text-color)]">Ninja Balls Background Remover</h1>
      <div>
        <Dropzone onDrop={handleFileDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Drag & drop an image here, or click to select one</p>
            </div>
          )}
        </Dropzone>

        {selectedFile && (
          <div>
            <p>Selected File: {selectedFile.name}</p>
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" width={300} height={200} />
            <button onClick={handleGenerateBackgroundRemoval}>Generate Background Removed Image</button>
          </div>
        )}

        {processedImage && (
          <div>
            <p>Background Removed Image:</p>
            <img src={processedImage} alt="Processed" width={300} height={200} />
          </div>
        )}
      </div>
    </main>
  );
};

export default ImageUploader;
