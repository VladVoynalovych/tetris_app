import './index.css';
import { useEffect, useRef, useState } from 'react';

export const CameraControl = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initCamera = async () => {
      setMediaStream(await navigator.mediaDevices.getUserMedia({ audio: false, video: true }));
    };

    initCamera();
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = mediaStream ?? null;
  }, [mediaStream]);

  return (
    <div className='camera-control'>
      <video className='stream-video' ref={videoRef} autoPlay></video>
    </div>
  );
};
