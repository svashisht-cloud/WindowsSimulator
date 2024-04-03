import { fileFormatTypes, componentListStrings } from "./Formats";

export const Experience = {
  logo: "folder.png",
  fileName: "Experience",
  type: fileFormatTypes.FOLDER,
  online: false,
  content: [
    {
      logo: "folder.png",
      fileName: "Outrider",
      type: fileFormatTypes.FOLDER,
      online: false,
      content: [
        {
          logo: "folder.png",
          fileName: "Remote Assist",
          type: fileFormatTypes.FOLDER,
          online: false,
          content: [
            {
              logo: "folder.png",
              fileName: "Images",
              type: fileFormatTypes.FOLDER,
              online: true,
              content: [],
              source: "Experience/Outrider/Remote Assist/images",
            },
          ],
        },
      ],
    },
  ],
};
