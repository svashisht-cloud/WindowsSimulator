export const FileList = [
    {
        source: "vscode.png",
        fileName: "vscode",
        onclick: () => { console.log("Wtf mate"); },
        selected: false,

    },
    {
        source: "folder.png",
        fileName: "Experience",
        onclick: () => { console.log("Wtf mate"); },
        selected: false,
        type: "folder",
        content: ["file1", "file2"]
    },
    {
        source: "folder.png",
        fileName: "Projects",
        onclick: () => { console.log("Wtf mate"); },
        selected: false,
        type: "folder",
        content: ["project1", "project2"]
    },
    {
        source: "folder.png",
        fileName: "Resume",
        onclick: () => { console.log("Wtf mate"); },
        selected: false,
        type: "folder",
        content: ["resume1", "resume2"]
    }
];