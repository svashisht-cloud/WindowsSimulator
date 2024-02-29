import './startmenu.css';
import { TiKeyOutline } from "react-icons/ti";

import { StartButtonOptions } from '../files/FileList';
const StartMenu = (props) => {

    const getStartMenuContents = () => {
        return StartButtonOptions.map((ell) =>
            <div className='startMenuContentsElement' onClick={() => props.openNewWindow(ell)}>
                <div className='startMenuContentsElementImageContainer'>
                    <img className='startMenuContentsElementImage'
                        // style={horizontal ? { width: "100%" } : { height: "100%" }}
                        // style={{ height: "100%" }}
                        src={ell.logo}
                        unselectable='on'
                    ></img>
                </div>
                <div className='startMenuContentsElementText'>
                    {ell.fileName}
                </div>
            </div>);

    };
    return (<div
        style={{ display: props.show ? "block" : "none" }}
        className='startMenuScreen' onClick={() => console.log("screen clicked")}>
        <div className='startMenuWindow'>
            <div className='startMenuTopBar'>
                <div className='userProfile'>

                    <img className='profilePicStartMenu'
                        // style={horizontal ? { width: "100%" } : { height: "100%" }}
                        // style={{ height: "100%" }}
                        src="shubh.jpg"
                        unselectable='on'
                    ></img>
                </div>
                <div className='userProfileName'>Guest</div>
            </div>
            <div className='startMenuContents'>
                {getStartMenuContents()}
            </div>
            <div className='startMenuSingingOptions'>
                <div className='startMenuSingingOptionsContainer' >
                    <div className='extraSpaceStartMenuSigningOptions'></div>

                    <div className='logoffButton'>
                        <div className='logoutKeyLogo'>
                            <TiKeyOutline />
                        </div>
                        <div className='logoffButtonString'>
                            Log off
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default StartMenu;