import './index.css';
import { useEffect, useRef, useState, RefObject } from 'react';

import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/hands';
import { HandDetector } from '@tensorflow-models/hand-pose-detection';
import { getFingerGesture } from '../../Controller/GestureController';
import { fromPixelsAsync } from '@tensorflow/tfjs-core/dist/ops/browser';

const MODEL = handPoseDetection.SupportedModels.MediaPipeHands;
const DETECTOR_CONFIG: handPoseDetection.MediaPipeHandsMediaPipeModelConfig = {
  runtime: 'mediapipe', // or 'tfjs',
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
  modelType: 'full',
  maxHands: 1,
};
const detectorCreator = handPoseDetection.createDetector(MODEL, DETECTOR_CONFIG);

const useCameraControl = ({ controls, videoRef }: CameraControlType & { videoRef: RefObject<HTMLVideoElement> }) => {
  const { arrowDown, arrowUp, arrowLeft, arrowRight } = controls;
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [detector, setDetector] = useState<HandDetector>();

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
    const handDetectionCondition = videoRef.current !== null && detector !== undefined && mediaStream;
    const getHands = async () => {
      if (handDetectionCondition) {
        let hands = await detector.estimateHands(await fromPixelsAsync(videoRef.current), { flipHorizontal: false });
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

    let interval: NodeJS.Timer;
    if (handDetectionCondition) {
      interval = setInterval(getHands, 100);
    }
    return () => {
      clearInterval(interval);
    };
  }, [detector, mediaStream, arrowUp, arrowLeft, arrowRight, arrowDown]);
};

type CameraControlType = {
  controls: {
    arrowRight: () => void;
    arrowLeft: () => void;
    arrowUp: () => void;
    arrowDown: () => void;
  };
};

export const CameraControl = ({ controls }: CameraControlType) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useCameraControl({ controls, videoRef });

  return (
    <div className='camera-control'>
      <video className='stream-video' ref={videoRef} autoPlay></video>
    </div>
  );
};
