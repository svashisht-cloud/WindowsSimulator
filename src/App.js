import Home from "./components/Home";
import { FileList } from "./components/files/FileList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import fireBaseManager from "./components/firebase/FileGetter";
import "./app.css";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const processFiles = async () => {
      const files = await fireBaseManager.processFileSystem(FileList);
      setLoading(false);
    };
    processFiles();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <div className="maincontent">
          {loading ? <div>Loading</div> : <Home />}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
