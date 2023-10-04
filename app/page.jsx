"use client"

import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('/api/backgroundRemoval', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Assuming the API response contains the processed image as a base64 string
      setProcessedImage(`data:image/png;base64,${response.data.base64Image}`);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl text-[var(--text-color)]">Ninja Balls Background Remover</h1>
      <div>
        <Dropzone onDrop={handleFileDrop} accept="image/*">
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
            <button onClick={handleUpload}>Upload & Process</button>
          </div>
        )}

        {processedImage && (
          <div>
            <p>Processed Image:</p>
            <img src={processedImage} alt="Processed" />
          </div>
        )}
      </div>
    </main>
  );
};

export default ImageUploader;
