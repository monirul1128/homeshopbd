import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

  function calculateTimeLeft(endTime) {
    const difference = new Date(endTime) - new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null; // Countdown is complete
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft(endTime);
      setTimeLeft(updatedTimeLeft);
      
      if (!updatedTimeLeft) {
        clearInterval(timer); // Stop the timer when countdown is complete
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [endTime]);

  if (!timeLeft) {
    return <div>Countdown complete!</div>;
  }

  return (
    <div className=' flex items-center gap-2'>
      <h2 className=' font-medium hidden md:block text-lg'> Ends after:</h2>
      <p className=' bg-orange-600 py-1 w-[146px] flex items-center justify-center px-3 rounded-md text-white'>
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
      </p>
    </div>
  );
};

export default CountdownTimer;
