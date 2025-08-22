"use client";

import { useParallax } from '@/hooks/useParalax';

const parallaxLayers = [
  { image: 'https://78.media.tumblr.com/cae86e76225a25b17332dfc9cf8b1121/tumblr_p7n8kqHMuD1uy4lhuo1_540.png', speedX: 600, speedY: 50, initialY: '20%', size: '2500px' },
  { image: 'https://78.media.tumblr.com/66445d34fe560351d474af69ef3f2fb0/tumblr_p7n908E1Jb1uy4lhuo1_1280.png', speedX: 250, speedY: 1, initialY: '100%', size: '800px' },
  { image: 'https://78.media.tumblr.com/8cd0a12b7d9d5ba2c7d26f42c25de99f/tumblr_p7n8kqHMuD1uy4lhuo2_1280.png', speedX: -20, speedY: 2, initialX: 500, initialY: '50%', size: '500px 200px' },
  { image: 'https://78.media.tumblr.com/5ecb41b654f4e8878f59445b948ede50/tumblr_p7n8on19cV1uy4lhuo1_1280.png', speedX: -20, speedY: 2, initialX: 1000, initialY: '100%', size: '1000px' },
  { image: 'https://78.media.tumblr.com/28bd9a2522fbf8981d680317ccbf4282/tumblr_p7n8kqHMuD1uy4lhuo3_1280.png', speedX: -20, speedY: 2, initialX: 400, initialY: '0%', size: '400px 260px' },
];

interface ParallaxBackgroundProps {
  children: React.ReactNode;
}

const ParallaxBackground = ({ children }: ParallaxBackgroundProps) => {
  const { handleMouseMove, getBackgroundImage, getBackgroundPosition, getBackgroundSize } = useParallax(parallaxLayers);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundRepeat: "repeat-x",
        backgroundPosition: getBackgroundPosition(),
        backgroundSize: getBackgroundSize(),
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxBackground;