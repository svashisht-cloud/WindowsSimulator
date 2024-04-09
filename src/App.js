import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import fireBaseManager from "./components/firebase/FileGetter";
import LoadingScreen from "./components/loadingScreen/LoadingScreen";
import "./app.css";
import Filelistmanager from "./managers/FileListManager";
import LoginScreen from "./components/loginScreen/LoginScreen";
import authenticationManager from "./managers/AuthenticationManager";

function App() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    const authenticated = authenticationManager.getUserLocalStorage();
    if (authenticated) {
      setSignedIn(true);
    }
    const processFiles = async () => {
      const new_files = await fireBaseManager.processFileSystem(
        Filelistmanager.getFileList()
      );
      Filelistmanager.setFileList(new_files);
      setLoading(false);
    };
    if (!signedIn) processFiles();
  }, []);

  const handleSignIn = (userName, password = "") => {
    const successLogin = authenticationManager.loginUser(userName, password);
    return successLogin;
  };

  const handleSuccessfulLogin = () => {
    setSignedIn(true);
  };

  const handleLogOut = () => {
    authenticationManager.logOut();
    setSignedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <div className="maincontent">
          {loading ? (
            <LoadingScreen />
          ) : signedIn ? (
            <Home handleLogOut={handleLogOut} />
          ) : (
            <LoginScreen
              handleSignIn={handleSignIn}
              handleSuccessfulLogin={handleSuccessfulLogin}
            />
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
