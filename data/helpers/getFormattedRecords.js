const { isLink } = require('./isLink');
const { getSinglePhotoName } = require('./getSinglePhotoName');
const { getCommonPaths } = require('./getCommonPaths');

exports.getFormattedRecords = (__dirname, records) => {
  const { inputFolderPath, imagesDir } = getCommonPaths(__dirname);

  return records.reduce((arr, record) => {
    const fullName = record['Full name'];
    if (fullName === 'Employee') {
      return arr;
    }

    let photo = getSinglePhotoName(record['Photo']);
    if (!photo) {
      return [...arr, { name: fullName, photoPath: '' }];
    }

    if (isLink(photo)) {
      const pathToSave = `${imagesDir}/${fullName.replace(' ', '_')}.jpg`;
      return [...arr, { name: fullName, type: 'link', url: photo, photoPath: pathToSave }];
    } else {
      const read = `${inputFolderPath}/${decodeURIComponent(photo)}`;
      const write = `${imagesDir}/${photo.slice(photo.lastIndexOf('/') + 1)}`;
      return [...arr, { name: fullName, type: 'file', read, photoPath: write }];
    }
  }, []);
};
