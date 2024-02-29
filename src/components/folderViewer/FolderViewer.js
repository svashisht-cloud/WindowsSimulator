import { useState, useEffect, useRef } from 'react';

import "./folderviewer.css";
import File from "../files/File";
import { fileFormatTypes, FileList } from '../files/FileList';

const FolderViewer = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentWidth, setCurrentWidth] = useState(null);

    const mainContentDiv = useRef(null);

    useEffect(() => {
        let width = (mainContentDiv.current.getBoundingClientRect().width / window.innerWidth) * 100;
        setCurrentWidth(width);
    }, [mainContentDiv.current, props.parentWidth]);

    const handleFileSelection = (fileName) => {
        if (fileName === null) setSelectedFile(null);
        else setSelectedFile(selectedFile => selectedFile === fileName ? null : fileName);
    };

    const handleFileClick = (event, ell) => {

        if (event.detail === 1) {
            handleFileSelection(ell.fileName);
        } else if (event.detail === 2) {
            if (ell.type === fileFormatTypes.APP) {
                props.openNewWindowForContent(ell);
            } else {
                props.handleOpenFile(event, ell);
            }
        };
        event.stopPropagation();
    };

    const getFolderSideBar = () => {
        return FileList.map(ell => <div className='folderViewerSideBarDirectoryElement' onClick={() => props.handleSidebarSelection(ell)}>
            <div className='folderViewerSideBarDirectoryLogo'>
                <img className='folderViewerSideBarDirectoryLogoImage' src={ell.logo} alt="Cinque Terre" unselectable='on' ></img>
            </div>
            <div className='folderViewerSideBarDirectoryName'>
                {ell.fileName}
            </div>
        </div>);
    };


    const calculateParentWidth = () => {
        if (mainContentDiv.current) {

            let width = (mainContentDiv.current.getBoundingClientRect().width / window.innerWidth) * 100;
            console.log("width: ", width);
            return width;
        } else return 0;
    };

    const getFilesandFolders = () => {
        return props.directory.content && props.directory.content.map((ell, index) => <File
            imageSource={ell.logo}
            onClick={(e) => handleFileClick(e, ell)}
            fileName={ell.fileName}
            selected={ell.fileName === selectedFile}
            fileCount={index}
            parentWidth={currentWidth}
        />);
    };

    return <div className='folderViewerFilesAndContent'>
        <div className='folderViewerSideBar'>
            {getFolderSideBar()}
        </div>
        <div className='folderViewerFilesAndContentMain' ref={mainContentDiv}>
            {getFilesandFolders()}
        </div>
    </div>;
};

export default FolderViewer;