const fs = require('fs');

exports.getCsvFileNames = (inputFolderPath) => {
  const regexForCsvSearching = /^(?=.*?\bTeam\b)(?=.*?\bDirectory\b).*$/;
  return fs
    .readdirSync(inputFolderPath)
    .filter((fileName) => fileName.endsWith('.csv') && regexForCsvSearching.test(fileName));
};
