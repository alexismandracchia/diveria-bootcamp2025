import { useState, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface ParallaxLayer {
  image: string;
  speedX: number;
  speedY: number;
  initialX?: number;
  initialY?: string;
  size: string;
}

export const useParallax = (layers: ParallaxLayer[]) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX / window.innerWidth - 0.5,
      y: e.clientY / window.innerHeight - 0.5,
    });
  }, []);


  const getBackgroundPosition = () => {
    return layers.map(layer => {
      const positionX = (layer.initialX ?? 0) - mousePosition.x * layer.speedX;

      const initialYValue = parseFloat(layer.initialY ?? '0');
      const positionY = initialYValue + mousePosition.y * layer.speedY;

      return `${positionX}px ${positionY}%`;
    }).join(", ");
  };
  
  const getBackgroundImage = () => layers.map(layer => `url('${layer.image}')`).join(", ");
  const getBackgroundSize = () => layers.map(layer => layer.size).join(", ");

  return { handleMouseMove, getBackgroundImage, getBackgroundPosition, getBackgroundSize };
};