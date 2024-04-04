import Home from "./components/Home";
import { FileList } from "./components/files/FileList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import fireBaseManager from "./components/firebase/FileGetter";
import LoadingScreen from "./components/loadingScreen/LoadingScreen";
import "./app.css";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const processFiles = async () => {
      const files = await fireBaseManager.processFileSystem(FileList);
      setLoading(false);
      console.log("loading end", new Date().toLocaleTimeString());
    };
    console.log("loading start", new Date().toLocaleTimeString());
    processFiles();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <div className="maincontent">
          {loading ? <LoadingScreen /> : <Home />}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
