const fs = require('fs');

exports.moveToImages = (readPath, writePath) => {
  const inStr = fs.createReadStream(readPath);
  const outStr = fs.createWriteStream(writePath);

  inStr.pipe(outStr);
  return outStr.path;
};
