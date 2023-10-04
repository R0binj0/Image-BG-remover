import { spawn } from 'child_process';
import { createWriteStream } from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const pythonProcess = spawn('python3', ['bg-remover.py']);

    // Handle input and output streams here
    // For example, pipe the uploaded image to the Python script
    req.pipe(pythonProcess.stdin);

    // Create a variable to store the base64 image data
    let base64ImageData = '';

    // Handle the Python script's output (base64 encoded image)
    pythonProcess.stdout.on('data', (data) => {
      base64ImageData += data.toString('base64');
    });

    pythonProcess.on('exit', () => {
      // Send the processed image as a response
      res.status(200).json({ message: 'Background removed', base64Image: base64ImageData });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
