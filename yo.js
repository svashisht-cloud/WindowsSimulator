const data = [
  {
    logo: "folder.png",
    fileName: "Home",
    online: false,
  },
];

const str = JSON.stringify(data);
const objectData = JSON.parse(str);
console.log("object: ", objectData);
