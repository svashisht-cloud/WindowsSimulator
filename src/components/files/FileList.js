const fileTypes = {
    "Music": {
        logo: "mp3.png",
        component: <div>Hello</div>,
        fileType: "app",
    },
    "Picture": {
        logo: "image.png",
        component: <div>Yo</div>,
        fileType: "app"
    },
    "PDF": {
        logo: "",
        component: <div>Yo</div>,
        fileType: "app"
    }
};


export const FileList = [
    {
        source: "vscode.png",
        fileName: "vscode",
        onclick: () => { console.log("Wtf mate"); },
        type: "app",
        selected: false,

    },
    {
        source: "folder.png",
        fileName: "Experience",
        onclick: () => { console.log("Wtf mate"); },
        selected: false,
        type: "folder",
        content: []
    },
    {
        source: "folder.png",
        fileName: "Projects",
        onclick: () => { console.log("Wtf mate"); },
        selected: false,
        type: "folder",
        content: []
    },
    {
        source: "folder.png",
        fileName: "Resume",
        onclick: () => { console.log("Wtf mate"); },
        selected: false,
        type: "folder",
        content: []
    },
    {
        source: "folder.png",
        fileName: "Pictures",
        onclick: () => { console.log("Wtf mate"); },
        selected: false,
        type: "folder",
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
        type: "folder",
        content: [{
            type: fileTypes.Music,
            fileName: "I_wanna_love_you.mp3"
        },
        {
            type: fileTypes.Music,
            fileName: "Aajkalzindagi"
        }]
    }
];