import "./loadingScreen.css";
import { useState, useEffect } from "react";

const LoadingScreen = (props) => {
  const [loadingBars, setLoadingBars] = useState([
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  useEffect(() => {
    const Interval = setInterval(() => {
      setLoadingBars((loadingBars) =>
        loadingBars.map((ell, index) => {
          if (index === 0 && ell === 1 && loadingBars[index + 2] === 1) {
            return 0;
          }
          if (index === 0 && loadingBars[loadingBars.length - 1] === 1) {
            return 1;
          }
          if (index !== 0 && ell === 1 && loadingBars[index - 1] === 0) {
            return 0;
          }
          if (index !== 0 && loadingBars[index - 1] === 1 && ell === 0) {
            return 1;
          }
          return ell;
        })
      );
    }, 200);

    return () => {
      clearInterval(Interval);
    };
  }, []);

  return (
    <div className="LoadingScreen">
      <div className="LoadingScreenContents">
        <div className="LoadingScreenWindowsLogo">
          <img
            className="windowsLoadingLogo"
            src="windowsLogo.png"
            alt="Cinque Terre"
            unselectable="on"
          ></img>
        </div>
        <div className="LoadingScreenLoadingBarContainer">
          <div className="LoadingScreenLoadingBar">
            {loadingBars.map((ell) => (
              <div
                className={`${
                  ell === 1 ? "activeLoadingBarElement" : ""
                } LoadingBarElement`}
              ></div>
            ))}
          </div>
        </div>
        <div className="LoadingScreenLoadingText"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
