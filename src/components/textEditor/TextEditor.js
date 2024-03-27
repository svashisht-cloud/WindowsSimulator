import "./texteditor.css";

import CodeMirror from '@uiw/react-codemirror';
// import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

import { dracula } from '@uiw/codemirror-theme-dracula';
// import { githubDark } from '@uiw/codemirror-theme-github';
// import { basicDark } from "@uiw/codemirror-theme-basic";

import { useCallback, useEffect, useState, useRef } from 'react';

const TextEditor = (props) => {
    const [value, setValue] = useState(props.source);
    const [fontSize, setFontSize] = useState(1.5);

    const onChange = useCallback((val, viewUpdate) => {
        setValue(val);
    }, []);

    return <div className="textEditorWindow">
        {/* <div className="textEditorToolbar">
            <button onClick={() => setFontSize(fontSize => fontSize + 0.5)}>+</button>
            <button onClick={() => setFontSize(fontSize => fontSize - 0.5)}>-</button>
        </div> */}
        <div className="textEditorComponent">

            <CodeMirror
                className="textCodeMirror"
                value={value}
                theme={dracula}
                // editable={false}
                style={{ fontSize: `${fontSize}vh` }}
                width="100%"
                height="100%"
                onChange={onChange}
            />
        </div>;
    </div>;
};

export default TextEditor;