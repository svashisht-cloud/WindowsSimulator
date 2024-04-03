import { FileList } from "./files/FileList";

import { useCallback, useEffect, useState, useRef, useContext } from "react";

import File from "./files/File";
import Taskbar from "./Taskbar/Taskbar";
import WindowModal from "./windowModal/Windowmodal";
import StartMenu from "./startMenu/StartMenu";
import { v4 as uuidv4 } from "uuid";

import "./home.css";

const Home = () => {
  //State
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState(null);
  const [windowModalMap, setwindowModalMap] = useState([]);
  const [topCount, setTopCount] = useState(10);
  const [showStartMenu, setshowStartMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const windowCountRef = useRef(0);

  const contextMenuPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setFiles(FileList.filter((ell) => ell.fileName === "Desktop")[0].content);
  }, []);

  useEffect(() => {
    console.log(" windowModalMap:", windowModalMap);
  }, [windowModalMap]);

  const getContextMenu = () => {
    // console.log(showContextMenu);
    return (
      <div
        className="contextMenu"
        style={{
          display: showContextMenu ? "block" : "none",
          top: `${contextMenuPosition.current.y}px`,
          left: `${contextMenuPosition.current.x}px`,
        }}
      >
        context Menu
      </div>
    );
  };

  const handleFileSelection = (fileName) => {
    if (fileName === null) setSelectedFile(null);
    else
      setSelectedFile((selectedFile) =>
        selectedFile === fileName ? null : fileName
      );
    setFiles((files) =>
      files.map((ell) => ({
        ...ell,
        selected: ell.fileName === fileName ? !ell.selected : false,
      }))
    );
  };

  const fileNameInWindowList = (fileName) => {
    return (
      windowModalMap.filter((ell) => ell.file.name === fileName).length > 0
    );
  };

  const handleFileClick = (file, event) => {
    if (event.detail === 1) {
      handleFileSelection(file.fileName);
    } else if (event.detail === 2) {
      const zValue = topCount + 1;
      if (!fileNameInWindowList(file.fileName)) {
        windowCountRef.current += 1;
        setwindowModalMap((windowModalMap) => [
          ...windowModalMap,
          {
            windowModalOpen: true,
            top: zValue,
            file: file,
            id: uuidv4(),
            windowCount: windowCountRef.current,
          },
        ]);
        handleWindowsSelection(file.fileName);
        setTopCount((topCount) => topCount + 1);
      } else {
        console.log("map before state :", windowModalMap);
        setwindowModalMap((windowModalMap) =>
          windowModalMap.map((ell) =>
            ell.file.name === file.fileName
              ? { ...ell, top: zValue, windowModalOpen: true }
              : ell
          )
        );
      }
    }
    closeStartMenuIfOpen();
    event.stopPropagation();
  };

  const handleWindowsSelection = (windowId, elementTop) => {
    if (elementTop === topCount) {
      // console.log("yeh ho rha he");
      return;
    }
    const zIndex = topCount;
    setwindowModalMap((windowModalMap) =>
      windowModalMap.map((ell) => ({
        ...ell,
        top: ell.id === windowId ? zIndex + 1 : ell.top,
      }))
    );
    setTopCount((topCount) => topCount + 1);
    closeStartMenuIfOpen();
  };

  const handleTaskBarIconClick = (windowId) => {
    let top = 0;
    setwindowModalMap((windowModalMap) =>
      windowModalMap.map((ell2) => {
        if (ell2.id === windowId) {
          top = ell2.top;
          return { ...ell2, windowModalOpen: true };
        }
        return ell2;
      })
    );
    handleWindowsSelection(windowId, top);
    closeStartMenuIfOpen();
  };

  const handleWindowMinimize = (windowId, event) => {
    event.stopPropagation();
    setwindowModalMap((windowModalMap) =>
      windowModalMap.map((ell2) =>
        ell2.id === windowId ? { ...ell2, windowModalOpen: false } : ell2
      )
    );
    closeStartMenuIfOpen();
  };

  const handleWindowClick = (event) => {
    // console.log("event: ", event);
    // event.preventDefault();
    // if (!windowModalOpen) {
    //   handleFileSelection(null);
    // }
    // setWindowModalOpen(false);
    closeStartMenuIfOpen();
  };

  const handleContextMenuClick = (event) => {
    // event.preventDefault();
    // contextMenuPosition.current.x = event.clientX;
    // contextMenuPosition.current.y = event.clientY;
    // setShowContextMenu(true);
  };

  const closeStartMenuIfOpen = () => {
    if (showStartMenu) {
      setshowStartMenu(false);
    }
  };

  const openNewWindow = (content) => {
    const zValue = topCount + 1;
    windowCountRef.current += 1;
    setwindowModalMap((windowModalMap) => [
      ...windowModalMap,
      {
        windowModalOpen: true,
        top: zValue,
        file: content,
        id: uuidv4(),
        windowCount: windowCountRef.current,
      },
    ]);
    setTopCount((topCount) => topCount + 1);
  };

  const getOS = () => {
    return (
      <div className="homeScreen">
        <div
          className="homeScreenMainContent"
          onClick={(e) => handleWindowClick(e)}
          onContextMenu={(e) => handleContextMenuClick(e)}
        >
          {showContextMenu && getContextMenu()}
          {windowModalMap &&
            windowModalMap.map((ell) => {
              return (
                <WindowModal
                  show={ell.windowModalOpen}
                  file={ell.file}
                  zvalue={ell.top}
                  windowCount={ell.windowCount}
                  openNewWindowForContent={(content) => openNewWindow(content)}
                  closeStartMenuIfOpen={() => closeStartMenuIfOpen()}
                  handleMinimize={(event) =>
                    handleWindowMinimize(ell.id, event)
                  }
                  handleWindowSelection={() =>
                    handleWindowsSelection(ell.id, ell.top)
                  }
                  handleClose={() => {
                    setwindowModalMap((windowModalMap) =>
                      windowModalMap.filter((ell2) => ell2.id !== ell.id)
                    );
                    windowCountRef.current -= 1;
                  }}
                />
              );
            })}
          {files &&
            Object.keys(files).map((ell, index) => (
              <File
                imageSource={files[ell].logo}
                onClick={(e) => handleFileClick(files[ell], e)}
                fileName={files[ell].fileName}
                selected={files[ell].fileName === selectedFile}
                fileCount={index}
                onDesktop={true}
              />
            ))}
        </div>
        <StartMenu
          show={showStartMenu}
          openNewWindow={(content) => openNewWindow(content)}
        />
        <Taskbar
          openWindows={windowModalMap}
          onWindowClick={(id) => handleTaskBarIconClick(id)}
          onStartClick={() =>
            setshowStartMenu((showStartMenu) => !showStartMenu)
          }
        />
      </div>
    );
  };

  return getOS();
};

export default Home;
