export const fileFormatTypes = {
    APP: "app",
    FOLDER: "folder"
};

export const componentListStrings = {
    MUSICPLAYER: "musicPlayer",
    PHOTOVIEWER: "photoViewer",
    PDFVIEWER: "pdfViewer",
    VSCODE: "vscode",
    FOLDERVIEWER: "folderViewer",
    VIDEOVIEWER: "videoViewer",
    TEXTEDITOR: "textEditor"
};


//basically each file/folder/app is going to be: 
/**
 *  {
 *  logo: 
 *  fileName: 
 *  type: 
 *  content: ?[]
 *  component: ?
 *  source: ?
 *  }
 *  
 * 
 */

const Desktop = {
    content: [
        {
            logo: "vscode.png",
            fileName: "vscode",
            type: fileFormatTypes.APP,
            component: componentListStrings.VSCODE
        },
        {
            logo: "folder.png",
            fileName: "Experience",
            type: fileFormatTypes.FOLDER,
            content: []
        },
        {
            logo: "folder.png",
            fileName: "Projects",
            type: fileFormatTypes.FOLDER,
            content: [{
                component: componentListStrings.FOLDERVIEWER,
                logo: "folder.png",
                type: fileFormatTypes.FOLDER,
                fileName: "shubhResume.pdf",
                content: [{
                    logo: "pdf.png",
                    component: componentListStrings.PDFVIEWER,
                    type: fileFormatTypes.APP,
                    fileName: "shubhResume.pdf",
                    source: "svresume.pdf"
                }]
            }]
        },
        {
            logo: "folder.png",
            fileName: "Resume",
            type: fileFormatTypes.FOLDER,
            content: [{
                logo: "pdf.png",
                component: componentListStrings.PDFVIEWER,
                type: fileFormatTypes.APP,
                fileName: "shubhResume.pdf",
                source: "svresume.pdf"
            }]
        },
        {
            logo: "folder.png",
            fileName: "Pictures",
            type: fileFormatTypes.FOLDER,
            content: [{
                logo: "image.png",
                component: componentListStrings.PHOTOVIEWER,
                type: fileFormatTypes.APP,
                fileName: "shubhandchirag.png",
                source: "friends.jpg"
            },
            {
                logo: "image.png",
                component: componentListStrings.PHOTOVIEWER,
                type: fileFormatTypes.APP,
                fileName: "shubh.jpg",
                source: "shubh.jpg"
            }
                ,
            {
                logo: "image.png",
                component: componentListStrings.PHOTOVIEWER,
                type: fileFormatTypes.APP,
                fileName: "Hyderabag.jpg",
                source: "https://lh3.google.com/u/0/d/1xN-9L1KdncyRcKvyeW39QMCrbfC1f5RA=w3141-h2028-iv1"
            }]

        },
        {
            logo: "folder.png",
            fileName: "fav songs",
            type: fileFormatTypes.FOLDER,
            content: [
                {
                    logo: "mp3.png",
                    component: componentListStrings.MUSICPLAYER,
                    type: fileFormatTypes.APP,
                    fileName: "HotlineBling",
                    source: "hotlinebling.mp3"
                }]
        },
        {
            logo: "folder.png",
            fileName: "Videos",
            type: fileFormatTypes.FOLDER,
            content: [
                {
                    logo: "MP4.png",
                    component: componentListStrings.VIDEOVIEWER,
                    type: fileFormatTypes.APP,
                    fileName: "RapVideo.mp4",
                    source: "https://youtu.be/QtIwRZehAG0?feature=shared"
                },

            ]
        }
    ],
    logo: "folder.png",
    fileName: "Desktop",
    type: fileFormatTypes.FOLDER,
};
const Documents = {
    logo: "folder.png",
    fileName: "Documents",
    type: fileFormatTypes.FOLDER,
    content: [
        {
            logo: "notepad.webp",
            component: componentListStrings.TEXTEDITOR,
            type: fileFormatTypes.APP,
            fileName: "yo.txt",
            source: "Hey hello"
        }
    ]
};

export const FileList = [
    {
        logo: "folder.png",
        fileName: "Home",
        type: fileFormatTypes.FOLDER,
        content: [Desktop, Documents]
    },
    Desktop
    ,
    Documents
];

export const StartButtonOptions = [
    {
        logo: "folder.png",
        fileName: "Projects",
        type: fileFormatTypes.FOLDER,
        content: [{
            component: componentListStrings.FOLDERVIEWER,
            logo: "folder.png",
            type: fileFormatTypes.FOLDER,
            fileName: "shubhResume.pdf",
            content: [{
                logo: "pdf.png",
                component: componentListStrings.PDFVIEWER,
                type: fileFormatTypes.APP,
                fileName: "shubhResume.pdf",
                source: "svresume.pdf"
            }]
        }]
    },
    {
        logo: "pdf.png",
        component: componentListStrings.PDFVIEWER,
        type: fileFormatTypes.APP,
        fileName: "shubhResume.pdf",
        source: "svresume.pdf"
    },
    {
        logo: "MP4.png",
        component: componentListStrings.VIDEOVIEWER,
        type: fileFormatTypes.APP,
        fileName: "MLproject.mp4",
        source: "https://youtu.be/mJ8K8c35N_g?feature=shared"
    },
    {
        logo: "MP4.png",
        component: componentListStrings.VIDEOVIEWER,
        type: fileFormatTypes.APP,
        fileName: "RapVideo.mp4",
        source: "https://youtu.be/QtIwRZehAG0?feature=shared"
    },
    {
        logo: "MP4.png",
        component: componentListStrings.VIDEOVIEWER,
        type: fileFormatTypes.APP,
        fileName: "DaftPunk.mp4",
        source: "https://youtu.be/wIMSU8otS-g?feature=shared"
    },
    {
        logo: "MP4.png",
        component: componentListStrings.VIDEOVIEWER,
        type: fileFormatTypes.APP,
        fileName: "MLproject.mp4",
        source: "https://youtu.be/mJ8K8c35N_g?feature=shared"
    },
    {
        logo: "MP4.png",
        component: componentListStrings.VIDEOVIEWER,
        type: fileFormatTypes.APP,
        fileName: "RapVideo.mp4",
        source: "https://youtu.be/QtIwRZehAG0?feature=shared"
    },
    {
        logo: "MP4.png",
        component: componentListStrings.VIDEOVIEWER,
        type: fileFormatTypes.APP,
        fileName: "DaftPunk.mp4",
        source: "https://youtu.be/wIMSU8otS-g?feature=shared"
    },
    {
        logo: "MP4.png",
        component: componentListStrings.VIDEOVIEWER,
        type: fileFormatTypes.APP,
        fileName: "MLproject.mp4",
        source: "https://youtu.be/mJ8K8c35N_g?feature=shared"
    },
    {
        logo: "MP4.png",
        component: componentListStrings.VIDEOVIEWER,
        type: fileFormatTypes.APP,
        fileName: "MLproject.mp4",
        source: "https://youtu.be/mJ8K8c35N_g?feature=shared"
    },
];