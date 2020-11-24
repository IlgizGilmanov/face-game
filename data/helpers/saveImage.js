const { moveToImages } = require('./moveToImages');
const { downloadAndSave } = require('./downloadAndSave');

exports.saveImage = async (record) => {
  const { name, type, read, url, photoPath } = record;

  switch (type) {
    case 'file':
      return { name, photoPath: moveToImages(read, photoPath) };
    case 'link':
      await downloadAndSave(url, photoPath);
      return { name, photoPath };
    default:
      return { name, photoPath: '' };
      return;
  }
};
