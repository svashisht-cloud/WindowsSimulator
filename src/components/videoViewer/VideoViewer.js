
import "./videoViewer.css";
import React from 'react';
import ReactPlayer from 'react-player';
const VideoViewer = (props) => {
    return <div className="videoViewer">
        <ReactPlayer url={props.source}
            height={"100%"}
            width={"100%"} />
    </div>;

};

export default VideoViewer;