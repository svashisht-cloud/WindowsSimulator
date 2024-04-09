import "./loginscreen.css";
import { useState, useRef } from "react";
import { FadeLoader } from "react-spinners";
import { FaArrowRight } from "react-icons/fa";
import users from "../../users/userlist";

const LoginScreen = (props) => {
  const [currentState, setCurrentState] = useState(0);
  const [currentUser, setCurrentUser] = useState({
    name: "Shubh Vashisht",
    needsLogin: true,
    pic: "shubh.jpg",
  });

  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const passwordRef = useRef("");

  const handleUserClick = (user) => {
    if (user.needsLogin) {
      setCurrentUser(user);
      setCurrentState(1);
    } else {
      const response = props.handleSignIn(user.name, "");
      if (response) {
        setCurrentUser(user);
        setCurrentState(2);
        setTimeout(() => {
          props.handleSuccessfulLogin();
        }, 2000);
      }
    }
  };

  const getAvailableUsers = () => {
    return (
      <div className="UsersAvailable">
        <div className="loginScreenLogo">
          <img
            className="loginScreenLogoImage"
            src="windowsXP.png"
            alt="Cinque Terre"
            unselectable="on"
          ></img>
        </div>
        <div className="UsersAvailableAllUsers">
          {users.map((ell) => (
            <div className="userElement" onClick={() => handleUserClick(ell)}>
              <div className="userProfilePic">
                <img
                  className="userProfilePicImage"
                  src={ell.pic}
                  alt="Cinque Terre"
                  unselectable="on"
                ></img>
              </div>
              <div className="userLoginProfileName">{ell.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleReturnToUsers = () => {
    setCurrentState(0);
  };

  const handleSignIn = () => {
    const password = passwordRef.current.value;
    const userName = currentUser.name;
    const response = props.handleSignIn(userName, password);
    if (response) {
      setCurrentState(2);
      setTimeout(() => {
        props.handleSuccessfulLogin();
      }, 2000);
    } else {
      setIncorrectPassword(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      handleSignIn();
    } else {
      setIncorrectPassword(false);
    }
  };

  const getSignInScreen = () => {
    return (
      <div className="LoginScreenSigninMenu">
        <div className="SignInUserInfo">
          <div className="userSignInProfilePic">
            <img
              className="userSignInProfilePicImage"
              src={currentUser.pic}
              alt="Cinque Terre"
              unselectable="on"
            ></img>
          </div>
          <div className="userSignInProfileName">{currentUser.name}</div>
        </div>
        <div className="signInPasswordHelper">Enter your Password:</div>
        <div className="EnterPassword">
          <input
            autoFocus
            className="inputFieldSignIN"
            type="password"
            ref={passwordRef}
            onKeyDown={handleKeyPress}
          ></input>
          <div className="signInSubmitButton" onClick={handleSignIn}>
            <FaArrowRight />
          </div>
        </div>
        {incorrectPassword && (
          <div className="signInIncorrectPassword">Incorrect Password</div>
        )}
        <div className="returnToUsers">
          <button className="returnToUsersButton" onClick={handleReturnToUsers}>
            Return to users
          </button>
        </div>
      </div>
    );
  };

  const getLoadingScreen = () => {
    return (
      <div className="LoginScreenLoading">
        <div className="LoginScreenWelcomeText">Signing in...</div>
        <div className="loadingScreenLoadingLoader">
          <FadeLoader
            className="fadeLoader"
            color={"white"}
            loading={true}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  };

  const getLoginScreenComponent = () => {
    if (currentState === 0) return getAvailableUsers();
    if (currentState === 1) return getSignInScreen();
    if (currentState === 2) return getLoadingScreen();
  };
  return (
    <div className="LoginScreenContainer">
      <div className="LoginScreen">{getLoginScreenComponent()}</div>
    </div>
  );
};

export default LoginScreen;
