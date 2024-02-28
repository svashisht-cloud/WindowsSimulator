import MusicPlayer from "../musicplayer/MusicPlayer";
export const fileFormatTypes = {
    APP: "app",
    FOLDER: "folder"
};

const componentListStrings = {
    MUSICPLAYER: "musicPlayer"
};

const fileTypes = {
    "Music": {
        logo: "mp3.png",
        component: <div>Hello</div>,
        fileType: fileFormatTypes.APP,
        contentType: "music",
        component: componentListStrings.MUSICPLAYER
    },
    "Picture": {
        logo: "image.png",
        component: <div>Yo</div>,
        fileType: fileFormatTypes.APP,
        contentType: "picture"
    },
    "PDF": {
        logo: "",
        component: <div>Yo</div>,
        fileType: fileFormatTypes.APP,
        contentType: "pdf"
    }
};


export const FileList = [
    {
        source: "vscode.png",
        fileName: "vscode",
        onclick: () => { console.log("Wtf mate"); },
        type: fileFormatTypes.APP,
        selected: false,

    },
    {
        source: "folder.png",
        fileName: "Experience",
        onclick: () => { console.log("Wtf mate"); },
        selected: false,
        type: fileFormatTypes.FOLDER,
        content: []
    },
    {
        source: "folder.png",
        fileName: "Projects",
        onclick: () => { console.log("Wtf mate"); },
        selected: false,
        type: fileFormatTypes.FOLDER,
        content: []
    },
    {
        source: "folder.png",
        fileName: "Resume",
        onclick: () => { console.log("Wtf mate"); },
        selected: false,
        type: fileFormatTypes.FOLDER,
        content: []
    },
    {
        source: "folder.png",
        fileName: "Pictures",
        onclick: () => { console.log("Wtf mate"); },
        selected: false,
        type: fileFormatTypes.FOLDER,
        content: [{
            type: fileTypes.Picture,
            fileName: "yo.png"
        },
        {
            type: fileTypes.Picture,
            fileName: "hehe.png"
        }]
    },
    {
        source: "folder.png",
        fileName: "fav songs",
        onclick: () => { console.log("Wtf mate"); },
        selected: false,
        type: fileFormatTypes.FOLDER,
        content: [
            {
                type: fileTypes.Music,
                fileName: "HotlineBling",
                source: "hotlinebling.mp3"
            }]
    }
];