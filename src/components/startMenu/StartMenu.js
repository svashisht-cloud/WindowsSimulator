import './startmenu.css';

const StartMenu = (props) => {

    return (<div
        style={{ display: props.show ? "block" : "none" }}
        className='startMenuScreen' onClick={() => console.log("screen clicked")}>
        <div className='startMenuWindow'>
            Helo
        </div>
    </div>);
};

export default StartMenu;