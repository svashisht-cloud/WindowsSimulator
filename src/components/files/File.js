import { useEffect, useState } from 'react';
import './file.css';
const File = (props) => {
    const [leftDisplacement, setLeftDisplacement] = useState("5vw");
    const [topDisplacement, setTopDisplacement] = useState("5vh");

    useEffect(() => {
        const iconCount = props.fileCount;
        const topCount = Math.floor(iconCount / 9);
        const widthCount = iconCount % 9;

        setTopDisplacement(`${10 * topCount}vh`);
        setLeftDisplacement(`${10 * widthCount}vw`);
    }, []);
    const { imageSource, fileName, onClick, selected } = props;

    return <div className={`${selected ? "selectedWindowFile" : ""}  windowsFile`} onClick={onClick} style={{ left: leftDisplacement ? leftDisplacement : "5vw", top: topDisplacement ? topDisplacement : "5vh" }}>
        <img className='windowsFileLogo' src={imageSource} alt="Cinque Terre" unselectable='on' ></img>
        <div className='windowsFileText'>{fileName}</div>
    </div>;
};

export default File;;