import { useEffect, useState } from 'react';
import './taskbar.css';
const Taskbar = (props) => {
    const [currentDate, setCurrentDate] = useState(null);
    useEffect(() => {
        console.log(props.openWindows);
        console.log("rerendered task bar");
        setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
    }, []);

    return <div className="windowsTaskbar">
        <div className='taskbarElement windowsStart'>
            <div className='startButtonContent' onClick={props.onStartClick}>
                <img className='windowsLogoTaskbar' src="windowsLogo.png" alt="Cinque Terre" unselectable='on' ></img>
                start
            </div>
        </div>

        <div className='taskbarElement windowsManager'>
            {props.openWindows && props.openWindows.map(ell =>
                <div className='windowsManagerElement' onClick={() => props.onWindowClick(ell.name)}>
                    <img className='taskbarWindowsLogo' src={ell.logo} alt="Cinque Terre" unselectable='on' ></img>
                </div>)}
        </div>

        <div className='taskbarElement windowsUtility'>
            <div className='utilitiesUtility'><p></p></div>
            {currentDate && <div className='utilitiesTime'><div>{currentDate.toLocaleTimeString()}</div></div>}
        </div>
    </div>;
};

export default Taskbar;