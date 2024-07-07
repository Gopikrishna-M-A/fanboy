import React from 'react';
import Lottie from 'lottie-react';
import animationData from './ball.json';

const LottieLoader = () => {
  return (
    <div className="lottie-loader">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 200, height: 200 }} // Adjust size as needed
      />
    </div>
  );
};

export default LottieLoader;    