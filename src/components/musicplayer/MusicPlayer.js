
import "./musicplayer.css";
import { Howl, Howler } from 'howler';
import { useEffect, useState, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeMute } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { IoPlayBack, IoPlayForwardSharp } from "react-icons/io5";
import { TbRepeatOff } from "react-icons/tb";
import { VscUnmute } from "react-icons/vsc";

const MusicPlayer = (props) => {
    const sound = useRef(new Howl({
        src: [props.source]
    }));
    const [paused, setPause] = useState(true);
    const [muted, setMuted] = useState(false);
    const [looped, setLooped] = useState(false);
    const [seekPercentage, setSeekPercentage] = useState(0);
    const seekRef = useRef(null);
    const playProgress = useRef(null);

    const startSeeking = () => {
        return setInterval(() => {
            setSeekPercentage(seekPercentage => (sound.current.seek() / sound.current.duration()) * 100);
        }, 300);
    };

    useEffect(() => {
        seekRef.current = startSeeking();
        return () => {
            Howler.unload();
            clearInterval(seekRef.current);
        };
    }, []);

    const playMusic = () => {
        if (paused) {
            sound.current.play();
            if (!seekRef.current) seekRef.current = startSeeking();
        } else {
            sound.current.pause();
            if (seekRef.current) {
                clearInterval(seekRef.current);
                seekRef.current = null;
            }
        }
        setPause(paused => !paused);
    };

    const unmuteMusic = () => {
        if (muted) {
            sound.current.mute(false);
        } else {
            sound.current.mute(true);
        }
        setMuted(muted => !muted);
    };

    const handleSeekbehind = () => {
        if (sound.current.seek() - 5 <= 0) {
            sound.current.seek(0);
        } else {
            sound.current.seek(sound.current.seek() - 5);
        }
        setSeekPercentage(seekPercentage => Math.round((sound.current.seek() / sound.current.duration()) * 100));
    };

    const handleSeekAhead = () => {
        if (sound.current.seek() + 5 >= sound.current.duration()) {
            return;
        } else {
            sound.current.seek(sound.current.seek() + 5);
        }
        setSeekPercentage(seekPercentage => Math.round((sound.current.seek() / sound.current.duration()) * 100));
    };

    const handleSetLoop = () => {
        if (looped) {
            sound.current.loop(false);
        } else {
            sound.current.loop(true);
        }
        setLooped(looped => !looped);
    };

    const handlePlayerClick = (event) => {
        const clientX = event.clientX;
        const startX = playProgress.current.getBoundingClientRect().x;
        const width = playProgress.current.getBoundingClientRect().width;
        const percentage = Math.floor(((clientX - startX) / (width)) * 100);
        setSeekPercentage(seekPercentage => percentage);
        sound.current.seek(Math.floor(sound.current.duration() * (percentage / 100)));
    };

    return <div className='musicPlayer'>
        <div className="musicPlayerBAckground" ref={playProgress} onClick={(e) => handlePlayerClick(e)}>
            <div className="musicPlayerSeekProgress" style={{ width: `${seekPercentage}%` }}></div>
        </div>
        <div className="musicToolbar">
            <div className="musicToolbarElement" onClick={handleSetLoop}>
                {looped ? <TbRepeatOff /> : <FaRepeat />}
            </div>
            <div className="musicToolbarElement" onClick={handleSeekbehind}>
                <IoPlayBack />
            </div>
            <div className="musicToolbarElement" onClick={playMusic}>
                {paused ? <FaPlay /> : <FaPause />}
            </div>
            <div className="musicToolbarElement" onClick={handleSeekAhead}>
                <IoPlayForwardSharp />
            </div>
            <div className="musicToolbarElement" onClick={unmuteMusic}>
                {muted ? <FaVolumeMute /> : <VscUnmute />}
            </div>
        </div>

    </div>;
};

export default MusicPlayer;