import "./vscodewindow.css";

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

// import { dracula } from '@uiw/codemirror-theme-dracula';
// import { githubDark } from '@uiw/codemirror-theme-github';
// import { basicDark } from "@uiw/codemirror-theme-basic";

import { useCallback, useEffect, useState, useRef } from 'react';

import { HomeWelcomeStrings } from "../Utilities";

const VsCodeWindow = () => {
    const startString = "Press enter to continue";
    const EVENTKEY = "Enter";
    const targetString = HomeWelcomeStrings;
    const [value, setValue] = useState(startString);

    const animation = useRef(null);
    const stringIterator = useRef(0);
    const vscodeIconClick = useRef(0);
    const fullStop = useRef(false);

    //Function to add start string
    const handleAddStartString = () => {
        setValue(value => value === "" ? (value + startString) : (value + "\n" + startString));
    };

    //Function to remove start string
    const handleRemoveStartString = () => {
        setValue(value => value.replace(startString, ''));
    };

    const onChange = useCallback((val, viewUpdate) => {
        setValue(val);
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === EVENTKEY) {
            handleAnimation();
        }
    };

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

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, true);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    return <div className="vsCodeWindow">
        <CodeMirror
            className="CodeMirror"
            value={value}
            theme={vscodeDark}
            // editable={false}
            style={{ fontSize: "1.5vh" }}
            width="100%"
            height="100%"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
        />
    </div>;
};

export default VsCodeWindow;