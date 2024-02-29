import { useEffect, useRef, useState } from "react";
import './photoviewer.css';

const PhotoViewer = (props) => {
    const imageRef = useRef(null);
    const frameRef = useRef(null);
    const [horizontal, setHorizontal] = useState(false);

    const handleOnload = () => {
        const width = imageRef.current.clientWidth;
        const height = imageRef.current.clientHeight;

        if (width > height) {
            setHorizontal(true);
        } else {
            setHorizontal(false);
        }
        console.log(frameRef.current.getBoundingClientRect().width);
        console.log(frameRef.current.getBoundingClientRect().height);
    };

    return <div ref={frameRef} className="imageViewerDiv">
        <img className='imageViewerPic'
            ref={imageRef}
            style={horizontal ? { width: "100%" } : { height: "100%" }}
            src={props.source}
            alt={props.name}
            unselectable='on'
            onLoad={handleOnload} ></img>
    </div>;
};

export default PhotoViewer;