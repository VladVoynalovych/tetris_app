type FingerCoords = {
  x: number;
  y: number;
};
export const getFingerGesture = (fingerTip: FingerCoords, fingerMCP: FingerCoords) => {
  if (fingerTip.y > fingerMCP.y && fingerTip.y - fingerMCP.y > 100) {
    return 'ArrowDown';
  }

  if (fingerMCP.y > fingerTip.y && fingerMCP.y - fingerTip.y > 100) {
    return 'ArrowUp';
  }

  if (fingerTip.x > fingerMCP.x && fingerTip.x - fingerMCP.x > 100) {
    return 'ArrowLeft';
  }

  if (fingerMCP.x > fingerTip.x && fingerMCP.x - fingerTip.x > 100) {
    return 'ArrowRight';
  }

  return null;
};
