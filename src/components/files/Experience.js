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
          fileName: "Remote_Assist",
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
        {
          logo: "folder.png",
          fileName: "Lidar Packet Bagger",
          type: fileFormatTypes.FOLDER,
          online: false,
          content: [
            {
              logo: "folder.png",
              fileName: "Images",
              type: fileFormatTypes.FOLDER,
              online: true,
              content: [],
              source: "Experience/Outrider/Lidar_packet_bagger/images",
            },
          ],
        },
        {
          logo: "folder.png",
          fileName: "Event Logger",
          type: fileFormatTypes.FOLDER,
          online: false,
          content: [
            {
              logo: "folder.png",
              fileName: "Images",
              type: fileFormatTypes.FOLDER,
              online: true,
              content: [],
              source: "Experience/Outrider/Event_logger/images",
            },
          ],
        },
      ],
    },
  ],
};
