import users from "../users/userlist";

import fireBaseManager from "../components/firebase/FileGetter";

class AuthenticationManager {
  constructor() {
    this.currentUser = null;
    this.userList = {};
    this.processUsers();
    this.authenticationLocalStorageKey = "authenticationKeySV";
  }

  processUsers = () => {
    for (let i = 0; i < users.length; ++i) {
      if (users[i].name in this.userList) continue;
      this.userList[users[i].name] = users[i];
    }
  };

  setUserLocalStorage = () => {
    const localStorageDate = { date: new Date(), user: this.currentUser };
    localStorage.setItem(
      this.authenticationLocalStorageKey,
      JSON.stringify(localStorageDate)
    );
  };

  logOut = () => {
    this.currentUser = "";
    localStorage.removeItem(this.authenticationLocalStorageKey);
  };

  getUserLocalStorage = () => {
    const localStorageData = JSON.parse(
      localStorage.getItem(this.authenticationLocalStorageKey)
    );
    if (!localStorageData) return false;
    const currentDate = new Date();
    const lastDate = new Date(localStorageData.date);
    const timeDifference = currentDate.getTime() - lastDate.getTime();

    const isExpired = timeDifference / (1000 * 60) > 30;
    if (isExpired) {
      localStorage.removeItem(this.authenticationLocalStorageKey);
      fireBaseManager.removeLocalStorageCache();
      return false;
    }
    const user = localStorageData.user;
    this.currentUser = user;
    return true;
  };

  loginUser = (userName, password = "") => {
    if (userName in this.userList) {
      const user = this.userList[userName];
      if (user.needsLogin) {
        if (password === process.env.REACT_APP_SVASHISHT_PASSWORD) {
          this.currentUser = user;
          this.setUserLocalStorage();
          return true;
        } else {
          return false;
        }
      } else {
        this.currentUser = user;
        this.setUserLocalStorage();
        return true;
      }
    }
    return false;
  };

  getFileList = (newFiles) => {
    return this.fileList;
  };
}

const authenticationManager = new AuthenticationManager();
export default authenticationManager;
