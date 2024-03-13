import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraFeed from '../../components/CameraFeed/CameraFeed';

const PanPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSaveAndContinue = () => {
    navigate('/signature');
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        const rectX = video.videoWidth * 0.1;
        const rectY = video.videoHeight * 0.1;
        const rectWidth = video.videoWidth * 0.8;
        const rectHeight = video.videoHeight * 0.8;

        canvas.width = rectWidth;
        canvas.height = rectHeight;

        context.drawImage(video, rectX, rectY, rectWidth, rectHeight, 0, 0, rectWidth, rectHeight);

        const stream = video.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());

        const imageDataUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageDataUrl);
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          const video = videoRef.current;
          if (video) {
            video.srcObject = stream;
            video.play();
          }
        })
        .catch((error) => {
          console.error("Error accessing the camera", error);
        });
    }
  };

  return (
    <div className="flex px-16 pt-20 gap-10">
    <div className='w-1/2'>
      <div className="flex items-center justify-around">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured frame" className="border-3 border-gray-300 rounded-md" />
        ) : (
          <CameraFeed videoRef={videoRef} />
        )}
      </div>
    </div>
    <div className='w-1/2'>
    <h1 className="text-4xl font-bold mb-4">Pan Card Upload</h1>
      <h2 className="mx-auto">Place your pan card inside the rectangle</h2>
      <div className="flex flex-col gap-2 mt-20">
          {capturedImage ? (
            <>
              <button onClick={handleRetake} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Retake</button>
              <button onClick={handleSaveAndContinue} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save and continue</button>
            </>
          ) : (
            <button onClick={handleCapture} className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Capture Frame</button>
          )}
        </div>
      </div>
      </div>
  );
};

export default PanPage;
