import { useEffect, useState } from "react";
import "./file.css";
const File = (props) => {
  const [leftDisplacement, setLeftDisplacement] = useState("5vw");
  const [topDisplacement, setTopDisplacement] = useState("5vh");

  useEffect(() => {
    const fileCountPerRow = props.parentWidth
      ? Math.floor(props.parentWidth / 10)
      : 10;
    const iconCount = props.fileCount;
    const topCount = Math.floor(iconCount / fileCountPerRow);
    const widthCount = iconCount % fileCountPerRow;

    setTopDisplacement(`${15 * topCount}vh`);
    setLeftDisplacement(`${10 * widthCount}vw`);
  }, [props.parentWidth]);

  const { imageSource, fileName, onClick, selected } = props;

  return (
    <div
      className={`${selected ? "selectedWindowFile" : ""}  windowsFile`}
      onClick={onClick}
      style={{
        left: leftDisplacement ? leftDisplacement : "5vw",
        top: topDisplacement ? topDisplacement : "5vh",
      }}
    >
      <img
        className="windowsFileLogo"
        src={props.imageSource}
        alt="Cinque Terre"
        unselectable="on"
      ></img>
      <div
        className={`${props.onDesktop ? "fileOnDesktop" : ""} windowsFileText`}
      >
        {fileName}
      </div>
    </div>
  );
};

export default File;
