import "./startmenu.css";
import { TiKeyOutline } from "react-icons/ti";
import authenticationManager from "../../managers/AuthenticationManager";
import { useEffect } from "react";

import { StartButtonOptions } from "../files/FileList";
const StartMenu = (props) => {
  useEffect(() => {
    console.log("auth: ", authenticationManager.currentUser);
  }, []);
  const getStartMenuContents = () => {
    return StartButtonOptions.map((ell) => (
      <div
        className="startMenuElement"
        onClick={() => props.openNewWindow(ell)}
      >
        <div className="startMenuElementImageContainer">
          <img
            className="startMenuElementImage"
            // style={horizontal ? { width: "100%" } : { height: "100%" }}
            // style={{ height: "100%" }}
            src={ell.logo}
            unselectable="on"
          ></img>
        </div>
        <div className="startMenuElementText">{ell.fileName}</div>
      </div>
    ));
  };
  return (
    <div
      style={{ display: props.show ? "block" : "none" }}
      className="startMenuScreen"
      onClick={() => console.log("screen clicked")}
    >
      <div className="startMenuWindow">
        <div className="startMenuTopBar">
          <div className="userProfile">
            <img
              className="profilePicStartMenu"
              // style={horizontal ? { width: "100%" } : { height: "100%" }}
              // style={{ height: "100%" }}
              src={
                authenticationManager.currentUser &&
                authenticationManager.currentUser.pic
              }
              unselectable="on"
            ></img>
          </div>
          <div className="userProfileName">
            {authenticationManager.currentUser &&
              authenticationManager.currentUser.name}
          </div>
        </div>
        <div className="startMenuContents">{getStartMenuContents()}</div>
        <div className="startMenuSingingOptions">
          <div className="startMenuSingingOptionsContainer">
            <div className="extraSpaceStartMenuSigningOptions"></div>

            <div className="logoffButton">
              <div className="logoutKeyLogo">
                <TiKeyOutline />
              </div>
              <div
                className="logoffButtonString"
                onClick={() => props.handleLogOut()}
              >
                Log off
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
