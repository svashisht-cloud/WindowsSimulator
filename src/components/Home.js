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

  //Refs
  const animation = useRef(null);
  const stringIterator = useRef(0);
  const vscodeIconClick = useRef(0);
  const fullStop = useRef(false);

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
    if (event.key === EVENTKEY) {
      handleAnimation();
    }
  };

  //bootup useEffect
  useEffect(() => {
    setFiles(FileList);
    // document.addEventListener('keydown', handleKeyDown, true);
    // return () => {
    //   document.removeEventListener('keydown', handleKeyDown);
    // };


  }, []);

  useEffect(() => {
    console.log("windowModalMap is: ", windowModalMap);
  }, [windowModalMap]);

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
      const zValue = windowModalMap.length + 1;
      if (!fileNameInWindowList(file.fileName)) {
        setwindowModalMap(windowModalMap => [
          ...windowModalMap, {
            name: file.fileName,
            windowModalOpen: true,
            top: zValue,
            content: file.content,
            type: file.type
          }
        ]);
        handleWindowsSelection(file.fileName);
      } else {
        setwindowModalMap(windowModalMap => windowModalMap.map(ell => ({ windowModalOpen: ell.name === file.fileName ? true : ell.windowModalMap })));
        // handleWindowSelection(fileName);
      }
    };
    event.stopPropagation();
  };

  const handleWindowsSelection = (filename) => {
    setwindowModalMap(windowModalMap => windowModalMap.sort((a, b) => a.top - b.top).map((ell, index) => ({ ...ell, top: ell.name === filename ? 1000 : index })));
  };

  const handleWindowClick = () => {
    // if (!windowModalOpen) {
    //   handleFileSelection(null);
    // }
    // setWindowModalOpen(false);
  };

  return <div className='homeScreen'>
    <div className="homeScreenMainContent" onClick={handleWindowClick}>
      {windowModalMap && windowModalMap.map((ell, index) => {
        return <WindowModal
          fileName={ell.name}
          show={ell.windowModalOpen}
          zvalue={ell.top}
          content={ell.content}
          windowType={ell.type}
          handleWindowSelection={() => handleWindowsSelection(ell.name)}
          handleClose={() => setwindowModalMap(windowModalMap => windowModalMap.map(ell2 => ell2.name === ell.name ? ({ ...ell2, windowModalOpen: false }) : ell2))}
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
    <Taskbar />
  </div>;
};

export default Home;
