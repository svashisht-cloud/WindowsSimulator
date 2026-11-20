import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loadingScreen/LoadingScreen";
import "./app.css";
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
    // Files are bundled with the app now, so just show the boot screen briefly.
    const bootTimer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(bootTimer);
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
