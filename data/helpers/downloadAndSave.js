const fs = require('fs');
const axios = require('axios');

exports.downloadAndSave = async (photoUrl, pathToSave) => {
  const { data } = await axios.get(photoUrl, { responseType: 'arraybuffer' });
  await fs.writeFile(pathToSave, data, (error) => {
    if (error) {
      throw new Error(error);
    }
  });
};
