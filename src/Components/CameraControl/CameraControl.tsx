import './index.css';
import { useEffect, useRef, useState } from 'react';

import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/hands';
import { HandDetector } from '@tensorflow-models/hand-pose-detection';

const MODEL = handPoseDetection.SupportedModels.MediaPipeHands;
const DETECTOR_CONFIG: handPoseDetection.MediaPipeHandsMediaPipeModelConfig = {
  runtime: 'mediapipe', // or 'tfjs',
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
  modelType: 'full',
  maxHands: 1,
};
const detectorCreator = handPoseDetection.createDetector(MODEL, DETECTOR_CONFIG);

export const CameraControl = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [detector, setDetector] = useState<HandDetector>();
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initCamera = async () => {
      setMediaStream(await navigator.mediaDevices.getUserMedia({ audio: false, video: true }));
    };

    const detectorInitializer = async () => {
      setDetector(await detectorCreator);
    };

    initCamera();
    detectorInitializer();
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = mediaStream ?? null;
  }, [mediaStream]);

  useEffect(() => {
    const getHands = async () => {
      if (videoRef.current !== null && detector !== undefined) {
        let hands = await detector.estimateHands(videoRef.current, { flipHorizontal: false });
        const fingerCoords = hands[0]?.keypoints?.[8];
        console.log(fingerCoords);

        // setCoords(({ x, y }) => {
        //   if (x !== 0 && y !== 0) {
        //     if (
        //       x - fingerCoords.x > 50 &&
        //       x - fingerCoords.x > 0 &&
        //       y - fingerCoords.y < 50 &&
        //       y - fingerCoords.y > -50
        //     ) {
        //       console.log('right');
        //       return {
        //         x: fingerCoords.x,
        //         y,
        //       };
        //     }
        //   }
        //
        //   return {
        //     x,
        //     y,
        //   };
        // });
      }
    };

    let interval = setInterval(getHands, 100);
    return () => {
      clearInterval(interval);
    };
  }, [detector]);

  return (
    <div className='camera-control'>
      <video className='stream-video' ref={videoRef} autoPlay></video>
    </div>
  );
};
