import { storage } from "./firebase";
import {
  ref,
  getDownloadURL,
  list,
  listAll,
  getMetadata,
} from "firebase/storage";

import { fileFormatTypes, componentListStrings } from "../files/Formats";

class FirebaseManager {
  constructor() {
    this.fileToLinkDictionary = new Map();
    this.sourceToContentMap = new Map();
    this.updateCallbackQueue = new Map();
    this.loading = true;
  }

  getFileUrlAndUpdateMap = async (name) => {
    try {
      const url = await this.downloadUrl(name);

      this.fileToLinkDictionary.set(name, url);
    } catch (error) {
      console.error("Error fetching URL for file ", name, ": ", error);
    }
  };

  downloadUrl = async (name) => {
    const fileListRef = ref(storage, name);
    return await getDownloadURL(fileListRef);
  };

  getFileUrl = async (name) => {
    if (this.fileToLinkDictionary.has(name)) {
      console.log("second time getting the same link");
      return this.fileToLinkDictionary.get(name);
    } else {
      try {
        const url = await this.downloadUrl(name);
        this.fileToLinkDictionary.set(name, url);
        return url;
      } catch (err) {
        console.error("unable to get file from firebase");
        return null;
      }
    }
  };

  processFileSystem = async (fileList) => {
    const callback = async (fileList) => {
      const newFileList = [];
      for (let i = 0; i < fileList.length; ++i) {
        const currentFile = fileList[i];
        if (currentFile.type === fileFormatTypes.APP) {
          newFileList.push(currentFile);
          continue;
        }
        if (currentFile.type === fileFormatTypes.FOLDER) {
          if (!currentFile.content) {
            continue;
          }

          if (currentFile.online === true) {
            if (this.sourceToContentMap.has(currentFile.source)) {
              newFileList.push(currentFile);
              continue;
            }
            const files = await this.listDirectoryContent(currentFile.source);
            const newContent = files.map((file) => this.createNewFile(file));
            this.sourceToContentMap.set(currentFile.source, newContent);
            currentFile.content = [...currentFile.content, ...newContent];
          } else if (currentFile.content.length > 0) {
            const processDirectory = await callback(currentFile.content);
            currentFile.content = processDirectory;
          }
        }
        newFileList.push(currentFile);
      }
      return newFileList;
    };
    this.loading = false;
    return await callback(fileList);
  };

  createNewFile = (fileSource) => {
    const config = this.getFileComponent(fileSource);
    return {
      logo: config.url,
      fileName: fileSource.metadata.name,
      component: config.component,
      type: fileFormatTypes.APP,
      online: true,
      content: [],
      source: fileSource.url,
    };
  };

  getFileComponent = (fileSource) => {
    const config = {};
    if (fileSource.metadata.contentType.includes("image")) {
      config.component = componentListStrings.PHOTOVIEWER;
      config.url = fileSource.url;
    }
    return config;
  };

  callUpdateCallbacks = () => {
    this.updateCallbackQueue.forEach((func, key) => {
      try {
        func();
      } catch (error) {
        console.log(
          `Error attempting to call update callback registered by ${key}: ${error}`
        );
      }
    });
  };

  listDirectoryContent = async (directoryName) => {
    const listRef = ref(storage, directoryName);
    // const
    const files = [];
    try {
      const res = await listAll(listRef);

      // Process prefixes
      for (const folderRef of res.prefixes) {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      }

      // Process items
      for (const itemRef of res.items) {
        // All the items under listRef.
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        files.push({ url, metadata });
      }
    } catch (error) {
      // Uh-oh, an error occurred!
      console.error("Error occurred: ", error);
    }
    return files;
  };

  registerUpdateCallback = (key, func) => {
    this.updateCallbackQueue.set(key, func);
  };

  unregisterUpdateCallback = (key) => {
    this.updateCallbackQueue.delete(key);
  };
}

let fireBaseManager = new FirebaseManager();

export default fireBaseManager;
