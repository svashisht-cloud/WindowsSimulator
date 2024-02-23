import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
// import { dracula } from '@uiw/codemirror-theme-dracula';
// import { githubDark } from '@uiw/codemirror-theme-github';
// import { basicDark } from "@uiw/codemirror-theme-basic";
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

import { HomeWelcomeStrings } from "./Utilities";
import { FileList } from './files/FileList';

import { useCallback, useEffect, useState, useRef } from 'react';

import File from './files/File';
import Taskbar from './Taskbar/Taskbar';
import WindowModal from './windowModal/Windowmodal';
import StartMenu from './startMenu/StartMenu';

import "./home.css";

const Home = () => {

  //Constant
  const startString = "Press enter to continue";
  const targetString = HomeWelcomeStrings;
  const EVENTKEY = "Enter";


  //State
  const [startCodeBlock, setStartCodeBlock] = useState(false);
  const [value, setValue] = useState(startString);
  const [terminalValue, setTerminalValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState(null);
  const [windowModalMap, setwindowModalMap] = useState([]);
  const [topCount, setTopCount] = useState(10);
  const [showStartMenu, setshowStartMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);

  //Refs
  const animation = useRef(null);
  const stringIterator = useRef(0);
  const vscodeIconClick = useRef(0);
  const fullStop = useRef(false);
  const contextMenuPosition = useRef({ x: 0, y: 0 });

  //UseCallback
  const onChange = useCallback((val, viewUpdate) => {
    setValue(val);
  }, []);

  const onTerminalChange = useCallback((val, viewUpdate) => {
    setTerminalValue(val);
  }, []);

  //Function to add start string
  const handleAddStartString = () => {
    setValue(value => value === "" ? (value + startString) : (value + "\n" + startString));
  };

  //Function to remove start string
  const handleRemoveStartString = () => {
    setValue(value => value.replace(startString, ''));
  };

  //Function to call when we press enter
  const handleKeyDown = (event) => {
    // if (event.key === EVENTKEY) {
    //   handleAnimation();
    // }
  };

  useEffect(() => {
    setFiles(FileList);
    // document.addEventListener('keydown', handleKeyDown, true);
    // return () => {
    //   document.removeEventListener('keydown', handleKeyDown);
    // };
  }, []);

  useEffect(() => { console.log(" windowModalMap:", windowModalMap); }, [windowModalMap]);

  const handleStringWrite = (stringVal, addStartString) => {
    let i = -1;
    animation.current = setInterval(() => {
      i += 1;
      if (i >= stringVal.length) {
        clearInterval(animation.current);
        animation.current = null;
        if (addStartString) handleAddStartString();
        return;
      }
      setValue(value => value + stringVal[i]);
    }, 10);
  };

  const getContextMenu = () => {
    console.log(showContextMenu);
    return <div className="contextMenu"
      style={{ display: showContextMenu ? "block" : "none", top: `${contextMenuPosition.current.y}px`, left: `${contextMenuPosition.current.x}px` }}
    >
      context Menu
    </div>;
  };

  const handleAnimation = () => {
    if (stringIterator.current >= targetString.length) {
      document.removeEventListener('keydown', handleKeyDown);
      handleRemoveStartString();
      return;
    }
    if (animation.current != null) {
      // we are still writing something
      return;
    }
    handleRemoveStartString();
    handleStringWrite(targetString[stringIterator.current], stringIterator.current < (targetString.length - 1));
    stringIterator.current += 1;
  };

  const handleFileSelection = (fileName) => {
    if (fileName === null) setSelectedFile(null);
    else setSelectedFile(selectedFile => selectedFile === fileName ? null : fileName);
    setFiles(files => files.map(ell => (
      { ...ell, selected: ell.fileName === fileName ? !ell.selected : false }
    )));
  };

  const fileNameInWindowList = (fileName) => {
    return windowModalMap.filter(ell => ell.name === fileName).length > 0;
  };

  const handleFileClick = (file, event) => {
    if (event.detail === 1) {
      handleFileSelection(file.fileName);
    } else if (event.detail === 2) {
      const zValue = topCount + 1;
      if (!fileNameInWindowList(file.fileName)) {
        setwindowModalMap(windowModalMap => [
          ...windowModalMap, {
            name: file.fileName,
            windowModalOpen: true,
            top: zValue,
            content: file.content,
            type: file.type,
            logo: file.source
          }
        ]);
        handleWindowsSelection(file.fileName);
        setTopCount(topCount => topCount + 1);
      } else {
        console.log("map before state :", windowModalMap);
        setwindowModalMap(windowModalMap => windowModalMap.map(ell => ell.name === file.fileName ? ({ ...ell, top: zValue, windowModalOpen: true }) : ell));
      }
    };
    closeStartMenuIfOpen();
    event.stopPropagation();
  };

  const handleWindowsSelection = (filename, elementTop) => {
    if (elementTop === topCount) {
      return;
    }
    const zIndex = topCount;
    setwindowModalMap(windowModalMap => windowModalMap.map(ell => ({ ...ell, top: ell.name === filename ? zIndex + 1 : ell.top })));
    setTopCount(topCount => topCount + 1);
    closeStartMenuIfOpen();
  };

  const handleTaskBarIconClick = (fileName) => {
    let top = 0;
    setwindowModalMap(windowModalMap => windowModalMap.map(ell2 => {
      if (ell2.name === fileName) {
        top = ell2.top;
        return { ...ell2, windowModalOpen: true };
      }
      return ell2;
    }));
    handleWindowsSelection(fileName, top);
    closeStartMenuIfOpen();
  };

  const handleWindowMinimize = (fileName, event) => {
    event.stopPropagation();
    setwindowModalMap(windowModalMap => windowModalMap.map(ell2 => ell2.name === fileName ? { ...ell2, windowModalOpen: false } : ell2));
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
    setwindowModalMap(windowModalMap => [
      ...windowModalMap, {
        name: content.fileName,
        windowModalOpen: true,
        top: zValue,
        type: content.type.fileType,
        component: content.type.component,
        logo: content.type.logo
      }
    ]);
    setTopCount(topCount => topCount + 1);
  };

  return <div className='homeScreen'>
    <div className="homeScreenMainContent"
      onClick={(e) => handleWindowClick(e)}
      onContextMenu={(e) => handleContextMenuClick(e)}
    >
      {showContextMenu && getContextMenu()}
      {windowModalMap && windowModalMap.map((ell) => {
        return <WindowModal
          fileName={ell.name}
          show={ell.windowModalOpen}
          zvalue={ell.top}
          content={ell.content}
          windowType={ell.type}
          component={ell.component}
          openNewWindowForContent={(content) => openNewWindow(content)}
          closeStartMenuIfOpen={() => closeStartMenuIfOpen()}
          handleMinimize={(event) => handleWindowMinimize(ell.name, event)}
          handleWindowSelection={() => handleWindowsSelection(ell.name, ell.top)}
          handleClose={() => setwindowModalMap(windowModalMap => windowModalMap.filter(ell2 => ell2.name !== ell.name))}
        />;
      })}
      {(!startCodeBlock && files) &&
        Object.keys(files).map((ell, index) => <File
          imageSource={files[ell].source}
          onClick={(e) => handleFileClick(files[ell], e)}
          fileName={files[ell].fileName}
          selected={files[ell].fileName === selectedFile}
          fileCount={index}
        />)
      }
      {startCodeBlock && <CodeMirror value={value}
        theme={vscodeDark}
        editable={false}
        lineCount={false}
        style={{ fontSize: "3rem" }}
        height='80vh'
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
      />}
    </div>
    <StartMenu
      show={showStartMenu}
    />
    <Taskbar
      openWindows={windowModalMap}
      onWindowClick={(windowName) => handleTaskBarIconClick(windowName)}
      onStartClick={() => setshowStartMenu(showStartMenu => !showStartMenu)}
    />
  </div >;
};

export default Home;
