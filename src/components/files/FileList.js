import { Experience } from "./Experience";

import { fileFormatTypes, componentListStrings } from "./Formats";

//basically each file/folder/app is going to be:
/**
 *  {
 *  logo:
 *  fileName:
 *  type:
 *  content: ?[]
 *  component: ?
 *  source: ?
 *  online: ?
 *  }
 */

const picture = (fileName) => ({
  logo: `pictures/${fileName}`,
  fileName,
  component: componentListStrings.PHOTOVIEWER,
  type: fileFormatTypes.APP,
  online: false,
  content: [],
  source: `pictures/${fileName}`,
});

const Desktop = {
  content: [
    {
      logo: "vscode.png",
      fileName: "vscode",
      type: fileFormatTypes.APP,
      component: componentListStrings.VSCODE,
      online: false,
    },
    Experience,
    {
      logo: "folder.png",
      fileName: "Projects",
      type: fileFormatTypes.FOLDER,
      online: false,
      content: [
        {
          logo: "search.png",
          fileName: "Search Algorithm",
          type: fileFormatTypes.APP,
          component: componentListStrings.SEARCHALGORITHM,
          online: false,
        },
      ],
    },
    {
      logo: "folder.png",
      fileName: "Resume",
      type: fileFormatTypes.FOLDER,
      online: false,
      content: [
        {
          logo: "pdf.png",
          component: componentListStrings.PDFVIEWER,
          type: fileFormatTypes.APP,
          fileName: "shubhResume.pdf",
          source: "svresume.pdf",
          online: false,
        },
      ],
    },
    {
      logo: "folder.png",
      fileName: "Pictures",
      type: fileFormatTypes.FOLDER,
      online: false,
      content: [
        picture("IMG_9169.jpg"),
        picture("friends.jpg"),
        picture("shubh.jpg"),
      ],
    },
    {
      logo: "folder.png",
      fileName: "fav songs",
      type: fileFormatTypes.FOLDER,
      online: false,
      content: [
        {
          logo: "mp3.png",
          component: componentListStrings.MUSICPLAYER,
          type: fileFormatTypes.APP,
          fileName: "HotlineBling",
          source: "hotlinebling.mp3",
        },
        {
          logo: "mp3.png",
          component: componentListStrings.MUSICPLAYER,
          type: fileFormatTypes.APP,
          fileName: "Trimski",
          source: "trimski.mp3",
        },
      ],
    },
    {
      logo: "folder.png",
      fileName: "Videos",
      type: fileFormatTypes.FOLDER,
      online: false,
      content: [
        {
          logo: "MP4.png",
          component: componentListStrings.VIDEOVIEWER,
          type: fileFormatTypes.APP,
          fileName: "RapVideo.mp4",
          source: "https://youtu.be/QtIwRZehAG0?feature=shared",
          online: true,
        },
      ],
    },
  ],
  logo: "desktop.png",
  fileName: "Desktop",
  type: fileFormatTypes.FOLDER,
  online: false,
};
const Documents = {
  logo: "document.png",
  fileName: "Documents",
  type: fileFormatTypes.FOLDER,
  online: false,
  content: [
    {
      logo: "notepad.webp",
      component: componentListStrings.TEXTEDITOR,
      type: fileFormatTypes.APP,
      fileName: "yo.txt",
      source: "Hey hello",
      online: false,
    },
  ],
};

export const FileList = [
  {
    logo: "folder.png",
    fileName: "Home",
    type: fileFormatTypes.FOLDER,
    content: [Desktop, Documents],
    online: false,
  },
  Desktop,
  Documents,
];

export const StartButtonOptions = [
  {
    logo: "folder.png",
    fileName: "Projects",
    type: fileFormatTypes.FOLDER,
    content: [
      {
        component: componentListStrings.FOLDERVIEWER,
        logo: "folder.png",
        type: fileFormatTypes.FOLDER,
        fileName: "shubhResume.pdf",
        content: [
          {
            logo: "pdf.png",
            component: componentListStrings.PDFVIEWER,
            type: fileFormatTypes.APP,
            fileName: "shubhResume.pdf",
            source: "svresume.pdf",
          },
        ],
      },
    ],
  },
  {
    logo: "pdf.png",
    component: componentListStrings.PDFVIEWER,
    type: fileFormatTypes.APP,
    fileName: "shubhResume.pdf",
    source: "svresume.pdf",
  },
  {
    logo: "MP4.png",
    component: componentListStrings.VIDEOVIEWER,
    type: fileFormatTypes.APP,
    fileName: "MLproject.mp4",
    source: "https://youtu.be/mJ8K8c35N_g?feature=shared",
  },
  {
    logo: "MP4.png",
    component: componentListStrings.VIDEOVIEWER,
    type: fileFormatTypes.APP,
    fileName: "RapVideo.mp4",
    source: "https://youtu.be/QtIwRZehAG0?feature=shared",
  },
  {
    logo: "MP4.png",
    component: componentListStrings.VIDEOVIEWER,
    type: fileFormatTypes.APP,
    fileName: "DaftPunk.mp4",
    source: "https://youtu.be/wIMSU8otS-g?feature=shared",
  },
  {
    logo: "MP4.png",
    component: componentListStrings.VIDEOVIEWER,
    type: fileFormatTypes.APP,
    fileName: "MLproject.mp4",
    source: "https://youtu.be/mJ8K8c35N_g?feature=shared",
  },
  {
    logo: "MP4.png",
    component: componentListStrings.VIDEOVIEWER,
    type: fileFormatTypes.APP,
    fileName: "RapVideo.mp4",
    source: "https://youtu.be/QtIwRZehAG0?feature=shared",
  },
  {
    logo: "MP4.png",
    component: componentListStrings.VIDEOVIEWER,
    type: fileFormatTypes.APP,
    fileName: "DaftPunk.mp4",
    source: "https://youtu.be/wIMSU8otS-g?feature=shared",
  },
  {
    logo: "MP4.png",
    component: componentListStrings.VIDEOVIEWER,
    type: fileFormatTypes.APP,
    fileName: "MLproject.mp4",
    source: "https://youtu.be/mJ8K8c35N_g?feature=shared",
  },
  {
    logo: "MP4.png",
    component: componentListStrings.VIDEOVIEWER,
    type: fileFormatTypes.APP,
    fileName: "MLproject.mp4",
    source: "https://youtu.be/mJ8K8c35N_g?feature=shared",
  },
];
