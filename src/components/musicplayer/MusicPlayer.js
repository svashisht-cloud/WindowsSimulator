import { Howl, Howler } from 'howler';
import { useEffect, useState } from 'react';
const MusicPlayer = () => {

    const [sound, setSound] = useState(null);

    useEffect(() => {
        setSound(new Howl({
            src: ['hotlinebling.mp3']
        }));

        return () => { Howler.unload(); };
    }, []);

    const playMusic = () => {
        sound.play();
    };

    const pauseMusic = () => {
        sound.pause();
    };

    const muteMusic = () => {
        sound.mute(true);
    };

    const unmuteMusic = () => {
        sound.mute(false);
    };


    return <div>
        <button onClick={playMusic}>Click me for music</button>
        <button onClick={pauseMusic}>Pause</button>
        <button onClick={muteMusic}>Mute</button>
        <button onClick={unmuteMusic}>unMute</button>

    </div>;
};

export default MusicPlayer;