import { FileList } from "../components/files/FileList";

class FileListManager {
  constructor() {
    this.fileList = FileList;
  }

  setFileList = (newFiles) => {
    this.fileList = newFiles;
  };

  getFileList = (newFiles) => {
    return this.fileList;
  };
}

const Filelistmanager = new FileListManager();
export default Filelistmanager;
