import React, { useRef, useState, useImperativeHandle, forwardRef } from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./TimerBar.css";

const RenderTime = ({ remainingTime }) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? "down" : ""}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  );
};

const TimerBar = forwardRef((props, ref) => {
  const [repeatState, setRepeatState] = useState(true);
  const [isVisible, setIsVisible] = useState(false);


  useImperativeHandle(ref, () => ({

    stopCounterRepeat(){
      console.log("game finished")
      setRepeatState(false)
      setIsVisible(true);
    }

  }));
  return (
    <div className="timer-container">
      {!isVisible && 
            <div className="timer-wrapper">
            <CountdownCircleTimer
              isPlaying
              duration={10}
              colors={"#61dafb"}
              trailColor={"transparent"}
              size={80}
              strokeWidth={5}
              trailStrokeWidth={5}
              onComplete={() => {
                // do your stuff here
                return { shouldRepeat: repeatState } // repeat animation in 1.5 seconds
              }}
            >
              {RenderTime}
            </CountdownCircleTimer>
          </div>
      }

    </div>
  );
});


export default TimerBar;
