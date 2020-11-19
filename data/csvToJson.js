// Export zip archive with users' data from notion
// Extract archive and put all contents of the archive in the `data/input` folder (create if not exists)
// run `node data/csvToJson.js` command in terminal (you need to have an installed nodejs)
// Converted json file will be in `output` folder, userpics - in `output/images`

// More info: https://www.npmjs.com/package/csvtojson

const fs = require('fs');
const axios = require('axios');
const CSVToJSON = require('csvtojson');

const inputFolderPath = `${__dirname}/input`;
const outputFolderPath = `${__dirname}/output`;

console.log('\x1b[36m%s\x1b[0m', 'Data file search...');

const regex = /^(?=.*?\bTeam\b)(?=.*?\bDirectory\b).*$/;
const fileNames = fs.readdirSync(inputFolderPath).filter((fn) => {
  return fn.endsWith('.csv') && regex.test(fn);
});

if (!fileNames.length) {
  console.log('\x1b[31m%s\x1b[0m', 'File not found!');
  throw new Error('File not found!');
}

console.log('\x1b[32m%s\x1b[0m', `File found: ${fileNames[0]}`);
console.log('\x1b[36m%s\x1b[0m', 'Data processing...');

CSVToJSON()
  .fromFile(`${inputFolderPath}/${fileNames[0]}`)
  .then((records) => {
    if (!records || !records.length) {
      console.log('\x1b[31m%s\x1b[0m', 'Records not found!');
      throw new Error('Records not found!');
    }

    const formattedRecords = [];

    records.forEach((item) => {
      const name = item['Full name'];
      let photoPath = item['Photo'];

      if (name === 'Employee') {
        return;
      }

      let outputPhotoPath = '';
      if (photoPath) {
        // if the user has several photos, get first one
        if (photoPath.indexOf(',') >= 0) {
          photoPath = photoPath.slice(0, photoPath.indexOf(','));
        }

        // create 'images' folder if not exists
        const imagesDir = `${outputFolderPath}/images`;
        if (!fs.existsSync(imagesDir)) {
          fs.mkdirSync(imagesDir);
        }

        // if url contains 'http' or 'https'
        if (/^(?=.*?((\bhttp\b)|(\bhttps\b))).*$/.test(photoPath)) {
          axios
            .get(photoPath, { responseType: 'arraybuffer' })
            .then(({ data }) => {
              fs.writeFile(`${imagesDir}/${name.replace(' ', '_')}.jpg`, data, (error) => {
                if (error) {
                  console.log(error);
                }
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const inStr = fs.createReadStream(`${inputFolderPath}/${decodeURIComponent(photoPath)}`);
          const outStr = fs.createWriteStream(
            `${outputFolderPath}/images/${photoPath.slice(photoPath.lastIndexOf('/') + 1)}`,
          );

          inStr.pipe(outStr);
          outputPhotoPath = outStr.path;
        }
      }

      formattedRecords.push({ name, profilePhoto: outputPhotoPath });
    });

    // create 'output' folder if not exists
    if (!fs.existsSync(outputFolderPath)) {
      fs.mkdirSync(outputFolderPath);
    }

    fs.writeFile(`${outputFolderPath}/team-directory.json`, JSON.stringify(formattedRecords, null, 2), (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log('\x1b[32m%s\x1b[0m', "Results are saved in a 'team-directory.json' file");
    });
  })
  .catch((err) => {
    throw new Error(err);
  });
