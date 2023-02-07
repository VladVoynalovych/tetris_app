import './index.css';
import { useEffect, useRef, useState } from 'react';

import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/hands';
import { HandDetector } from '@tensorflow-models/hand-pose-detection';
import { getFingerGesture } from '../../Controller/GestureController';

const MODEL = handPoseDetection.SupportedModels.MediaPipeHands;
const DETECTOR_CONFIG: handPoseDetection.MediaPipeHandsMediaPipeModelConfig = {
  runtime: 'mediapipe', // or 'tfjs',
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
  modelType: 'full',
  maxHands: 1,
};
const detectorCreator = handPoseDetection.createDetector(MODEL, DETECTOR_CONFIG);

type CameraControlType = {
  controls: {
    arrowRight: () => void;
    arrowLeft: () => void;
    arrowUp: () => void;
    arrowDown: () => void;
  };
};

export const CameraControl = ({ controls }: CameraControlType) => {
  const { arrowDown, arrowUp, arrowLeft, arrowRight } = controls;
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [detector, setDetector] = useState<HandDetector>();

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

    return () => {
      setMediaStream((stream) => {
        const tracks = stream?.getTracks();
        tracks?.forEach((track) => {
          track.stop();
        });

        return undefined;
      });
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = mediaStream ?? null;
  }, [mediaStream]);

  useEffect(() => {
    const getHands = async () => {
      if (videoRef.current !== null && detector !== undefined && mediaStream) {
        let hands = await detector.estimateHands(videoRef.current, { flipHorizontal: false });
        if (!hands[0]) return;

        const indexFingerTip = hands[0].keypoints[8];
        const indexFingerMCP = hands[0].keypoints[5];

        const direction = getFingerGesture(indexFingerTip, indexFingerMCP);

        if (direction !== null) {
          switch (direction) {
            case 'ArrowDown':
              arrowDown();
              break;
            case 'ArrowUp':
              arrowUp();
              break;
            case 'ArrowLeft':
              arrowLeft();
              break;
            case 'ArrowRight':
              arrowRight();
              break;
          }
        }
      }
    };

    let interval = setInterval(getHands, 100);
    return () => {
      clearInterval(interval);
    };
  }, [detector, mediaStream, arrowUp, arrowLeft, arrowRight, arrowDown]);

  return (
    <div className='camera-control'>
      <video className='stream-video' ref={videoRef} autoPlay></video>
    </div>
  );
};
