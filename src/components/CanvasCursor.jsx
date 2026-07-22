import { useRef } from 'react';
import useCanvasCursor from '../hooks/useCanvasCursor';
import './CanvasCursor.css';

export default function CanvasCursor() {
  const canvasRef = useRef(null);
  useCanvasCursor(canvasRef);

  return <canvas ref={canvasRef} className="canvas-cursor" aria-hidden="true" />;
}
