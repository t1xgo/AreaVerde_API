const fs = require("fs");

const createFolder = (path) => {
  if (fs.existsSync(path)) {
    return "EXIST";
  } else {
    return fs.mkdirSync(path, { recursive: true });
  }
};

const saveFile = (path, data) => {
  return fs.writeFileSync(path, data);
};

const readDirectory = (path) => {
  return fs.readdirSync(path);
};

module.exports = { saveFile, createFolder, readDirectory };