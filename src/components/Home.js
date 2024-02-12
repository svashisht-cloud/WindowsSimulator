import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useCallback, useEffect, useState, useRef } from 'react';
import { basicDark } from "@uiw/codemirror-theme-basic";
import { homeWelcomeString } from "./Utilities";
const Home = () => {
  const targetString = homeWelcomeString;
  const [value, setValue] = useState("");
  const iterator = useRef(-1);
  const animation = useRef(null);
  const onChange = useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);

  const handleAnimation = () => {
    const interval = setInterval(() => {
      iterator.current += 1;
      if ((iterator.current >= targetString.length) || (animation && (value === targetString))) {
        clearInterval(animation.current);
        return;
      }
      setValue(value => value + targetString[iterator.current]);
    }, 30);
    animation.current = interval;
  };

  useEffect(() => {
    handleAnimation();
  }, []);

  return <div style={{ margin: "30px" }}>
    <CodeMirror value={value}
      theme={basicDark}
      style={{ fontSize: "2rem" }}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />;
  </div>;
};

export default Home;
