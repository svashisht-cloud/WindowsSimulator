import { useEffect, useRef, useState } from 'react';
import './windowmodal.css';
import { RxCross1 } from "react-icons/rx";
import { FaRegWindowMaximize, FaWindowMinimize, FaWindowRestore } from "react-icons/fa";

import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";

import FolderViewer from '../folderViewer/FolderViewer';
import MusicPlayer from '../musicplayer/MusicPlayer';
import PhotoViewer from '../photoviewer/photoviewer';
import PdfViewer from '../pdfviewer/PdfViewer';
import TextEditor from '../textEditor/TextEditor';
import VsCodeWindow from '../vscodeWindow/VsCodeWindow';
import VideoViewer from '../videoViewer/VideoViewer';

import { fileFormatTypes } from '../files/FileList';
import { componentListStrings } from '../files/FileList';


const WindowModal = (props) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedDirectory, setSelectedDirectory] = useState(props.file);
    const [isBackButtonDisabled, setIsBackButtonDisabled] = useState(true);
    const [isForwardButtonDisabled, setIsForwardButtonDisabled] = useState(true);
    // const [currentDirectory, setCurrentDirectory] = useState([props.file.content]);

    const [height, setHeight] = useState("50%");
    const [width, setWidth] = useState("60%");

    const directoryList = useRef([props.file]);
    const workingPathList = useRef([props.file.fileName]);
    const currentDirectoryIndex = useRef(0);

    const windowRef = useRef(null);
    const handleWindowModalClick = (event) => {
        props.handleWindowSelection(event);
        event.stopPropagation();
    };

    useEffect(() => {
    }, [isFullScreen]);

    useEffect(() => {
        setIsBackButtonDisabled(currentDirectoryIndex.current === 0);
        setIsForwardButtonDisabled(currentDirectoryIndex.current === directoryList.current.length - 1);
        console.log("directoryList: ", directoryList);
        console.log("workingPathList: ", workingPathList);
    }, [selectedDirectory]);

    const handleTopBarMouseDown = (e) => {
        if (isFullScreen) {
            setHeight("80%");
            setWidth("80%");
            setIsFullScreen(false);
        }
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

    const handleMaximiseMinimise = (event) => {
        event.stopPropagation();
        event.preventDefault();
        props.closeStartMenuIfOpen();
        if (!isFullScreen) {
            windowRef.current.style.top = 0;
            windowRef.current.style.left = 0;
            setHeight("100%");
            setWidth("100%");
        } else {
            windowRef.current.style.top = 10 + "vh";
            windowRef.current.style.left = 15 + "vw";
            setHeight("50%");
            setWidth("60%");
        }
        setIsFullScreen(isFullScreen => !isFullScreen);
    };

    const handleOpenFile = (event, ell, isSideBarDirectory = false) => {
        event.stopPropagation();

        // first whenever a new file is opened, deleted all element from current index till last index
        if (directoryList.current.length > 1) {
            directoryList.current.splice(currentDirectoryIndex.current + 1, directoryList.current.length - (currentDirectoryIndex.current + 1));
            workingPathList.current.splice(currentDirectoryIndex.current + 1, workingPathList.current.length - (currentDirectoryIndex.current + 1));
        }

        if (isSideBarDirectory) {
            workingPathList.current.push(ell.fileName);
        } else {
            workingPathList.current.push(workingPathList.current[currentDirectoryIndex.current] + "/" + ell.fileName);
        }
        currentDirectoryIndex.current += 1;
        directoryList.current.push(ell);
        setSelectedDirectory(ell);
    };

    const handleSidebarSelection = (event, directory) => {
        handleOpenFile(event, directory, true);
        // if (directoryList.current.length > 1) {
        //     directoryList.current.splice(currentDirectoryIndex.current + 1, directoryList.current.length - (currentDirectoryIndex.current + 1));
        //     workingPathList.current.splice(currentDirectoryIndex.current + 1, workingPathList.current.length - (currentDirectoryIndex.current + 1));
        // }

        // currentDirectoryIndex.current += 1;
        // directoryList.current.push(directory);
        // setSelectedDirectory(directory);
    };

    const getAppDisplay = () => {
        const { component, fileName, source } = selectedDirectory;
        if (component === componentListStrings.MUSICPLAYER) {
            return <MusicPlayer
                name={fileName}
                source={source}
            />;
        } else if (component === componentListStrings.PHOTOVIEWER) {
            return <PhotoViewer
                name={fileName}
                source={source}
            />;
        } else if (component === componentListStrings.PDFVIEWER) {
            return <PdfViewer
                name={fileName}
                source={source}
            />;
        } else if (component === componentListStrings.VSCODE) {
            return <VsCodeWindow
                name={fileName}
                source={source}
            />;
        } else if (component === componentListStrings.VIDEOVIEWER) {
            return <VideoViewer
                name={fileName}
                source={source}
            />;
        } else if (component === componentListStrings.TEXTEDITOR) {
            return <TextEditor
                name={fileName}
                source={source}
            />;
        }
    };

    const handleBackAndForward = (isBack) => {
        if (isBack) {
            if (currentDirectoryIndex.current === 0) return;
            currentDirectoryIndex.current -= 1;
        } else {
            if (currentDirectoryIndex.current === directoryList.current.length - 1) return;
            currentDirectoryIndex.current += 1;
        }
        setSelectedDirectory(directoryList.current[currentDirectoryIndex.current]);
    };

    const getModalContent = () => {
        if (selectedDirectory.type) {
            if (selectedDirectory.type === fileFormatTypes.APP) {
                return getAppDisplay();
            }
            if (selectedDirectory.type === fileFormatTypes.FOLDER) {
                return <div className='folderViewerMain'>
                    <div className='folderViewerTopBar'>
                        <div className='backAndForwardTools'>
                            <div className="folderViewerTools">
                                <button className={`backAndForwardButton ${!isBackButtonDisabled ? "notDisabledButton" : ""} `} disabled={isBackButtonDisabled} onClick={() => handleBackAndForward(true)}>
                                    <SlArrowLeftCircle />
                                </button>
                            </div>
                            <div className="folderViewerTools">
                                <button className={`backAndForwardButton ${!isForwardButtonDisabled ? "notDisabledButton" : ""} `} disabled={isForwardButtonDisabled} onClick={() => handleBackAndForward(false)}>
                                    <SlArrowRightCircle />
                                </button>
                            </div>
                        </div>
                    </div>
                    <FolderViewer
                        directory={selectedDirectory}
                        handleOpenFile={handleOpenFile}
                        openNewWindowForContent={props.openNewWindowForContent}
                        handleSidebarSelection={handleSidebarSelection}
                        parentWidth={width}
                    />
                </div>;
            }
        } else {
            return <div> There was an error</div>;
        }
    };

    const getSelectedDirectoryWorkingPath = () => {
        let workingPath = "~/" + workingPathList.current[currentDirectoryIndex.current];
        return workingPath;
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
            <div className='modalTopbar' id="modalTopbar">
                <div className='modalTopbarFilename' onMouseDown={(e) => handleTopBarMouseDown(e)}>
                    <img className='modalTopBarIcon' src={selectedDirectory.logo} alt="Cinque Terre" unselectable='on' ></img>
                    {/* <div className='modalTopbarFilenameText'> {selectedDirectory.fileName}</div> */}
                    <div className='modalTopbarFilenameText'> {getSelectedDirectoryWorkingPath()}</div>
                </div>
                <div className="topbarTools">
                    <div className="modalTopbarMinimiseButton topbarToolsButton" onClick={(e) => props.handleMinimize(e)}>
                        <FaWindowMinimize />
                    </div>
                    <div className="modalTopbarMaximiseButton topbarToolsButton" onClick={(e) => handleMaximiseMinimise(e)}>
                        {!isFullScreen ? <FaRegWindowMaximize /> : <FaWindowRestore />}
                    </div>
                    <div className="modalTopbarCloseButton topbarToolsButton" onClick={props.handleClose}>
                        <RxCross1 />
                    </div>
                </div>
            </div>
            <div className='modalContent'>
                {getModalContent()}
            </div>
        </div>
    </div>;
};

export default WindowModal;;