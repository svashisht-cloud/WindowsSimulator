import { useEffect, useState } from 'react';
import './taskbar.css';
const Taskbar = (props) => {
    const [currentDate, setCurrentDate] = useState(null);
    useEffect(() => {
        setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
    }, []);

    return <div className="windowsTaskbar">
        <div className='taskbarElement windowsStart'>
            <div className='startButtonContent'>
                <img className='windowsLogoTaskbar' src="windowsLogo.png" alt="Cinque Terre" unselectable='on' ></img>
                start
            </div>
        </div>

        <div className='taskbarElement windowsManager'>
            {props.openWindows && props.openWindows.map(ell => <div>
                window open
            </div>)}
        </div>

        <div className='taskbarElement windowsUtility'>
            <div className='utilitiesUtility'><p></p></div>
            {currentDate && <div className='utilitiesTime'><div>{currentDate.toLocaleTimeString()}</div></div>}
        </div>
    </div>;
};

export default Taskbar;