import { fileFormatTypes, componentListStrings } from "./Formats";

const image = (fileName, source) => ({
  logo: source,
  fileName,
  component: componentListStrings.PHOTOVIEWER,
  type: fileFormatTypes.APP,
  online: false,
  content: [],
  source,
});

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
          fileName: "Docklight Assist",
          type: fileFormatTypes.FOLDER,
          online: false,
          content: [
            {
              logo: "folder.png",
              fileName: "Images",
              type: fileFormatTypes.FOLDER,
              online: false,
              content: [
                image("1-event-list.png", "docklight-assist/1-event-list.png"),
                image("2-mission-ids.png", "docklight-assist/2-mission-ids.png"),
                image(
                  "3-process-queue.png",
                  "docklight-assist/3-process-queue.png"
                ),
                image(
                  "4-extraction-log.png",
                  "docklight-assist/4-extraction-log.png"
                ),
              ],
            },
          ],
        },
      ],
    },
  ],
};
