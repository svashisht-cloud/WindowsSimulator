import { useEffect, useRef, useState } from 'react';
import './windowmodal.css';
import { RxCross1 } from "react-icons/rx";
import { FaRegWindowMaximize } from "react-icons/fa";
import { FaWindowMinimize } from "react-icons/fa";
import { FaWindowRestore } from "react-icons/fa";


const WindowModal = (props) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [height, setHeight] = useState("50%");
    const [width, setWidth] = useState("60%");
    const windowRef = useRef(null);
    const handleWindowModalClick = (event) => {
        props.handleWindowSelection(event);
        event.stopPropagation();
    };
    useEffect(() => {
        // console.log(props.fileName);
        console.log(props.content);
    }, []);

    const handleTopBarMouseDown = (e) => {
        props.handleWindowSelection(e);
        e.preventDefault();
        // get the mouse cursor position at startup:
        let pos3 = e.clientX;
        let pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;

        function elementDrag(e) {
            e = e;
            e.preventDefault();
            // calculate the new cursor position:
            let pos1 = pos3 - e.clientX;
            let pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            windowRef.current.style.top = (windowRef.current.offsetTop - pos2) + "px";
            windowRef.current.style.left = (windowRef.current.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    };

    const handleMaximiseMinimise = () => {
        if (!isFullScreen) {
            windowRef.current.style.top = 0;
            windowRef.current.style.left = 0;
            setHeight("100%");
            setWidth("100%");
        } else {
            windowRef.current.style.top = "10vh";
            windowRef.current.style.left = "15vw";
            setHeight("50%");
            setWidth("60%");
        }
        setIsFullScreen(isFullScreen => !isFullScreen);
    };

    return <div className="modal" id="modal"
        style={{
            display: props.show ? "block" : "none",
            zIndex: props.numWindowsOpen ? props.numWindowsOpen : 1,
            height: height ? height : "50%",
            width: width ? width : "60%",
            zIndex: props.zvalue
        }}
        onClick={(e) => handleWindowModalClick(e)}
        ref={windowRef}
    >
        <div className='modalWindow'>
            <div className='modalTopbar' id="modalTopbar" onMouseDown={(e) => handleTopBarMouseDown(e)}>
                <div className='modalTopbarFilename'>
                    {props.fileName}
                </div>
                <div className="topbarTools">
                    <div className="modalTopbarMinimiseButton topbarToolsButton" onClick={props.handleClose}>
                        <FaWindowMinimize />
                    </div>
                    <div className="modalTopbarMaximiseButton topbarToolsButton" onClick={handleMaximiseMinimise}>
                        {!isFullScreen ? <FaRegWindowMaximize /> : <FaWindowRestore />}
                    </div>
                    <div className="modalTopbarCloseButton topbarToolsButton" onClick={props.handleClose}>
                        <RxCross1 />
                    </div>
                </div>
            </div>
            <div className='modalContent'>
                {props.content && props.content.map(ell => <div>{ell}</div>)}
            </div>
        </div>
    </div>;
};

export default WindowModal;;