const fs = require('fs');
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

      if (photoPath) {
        if (photoPath.indexOf(',') >= 0) {
          photoPath = photoPath.slice(0, photoPath.indexOf(','));
        }
        console.log(photoPath);

        // if url contains
        if (/^(?=.*?\bhttp\b).*$/.test(fn)) {
          // TODO: Download image and save in /images folder
          // https://stackoverflow.com/questions/12740659/downloading-images-with-node-js
          return;
        }

        // const inStr = fs.createReadStream(`${inputFolderPath}/${decodeURIComponent(photoPath)}`);
        // console.log('inStr', inStr.path);
        // const outStr = fs.createWriteStream(
        //   `${outputFolderPath}/images/${photoPath.slice(photoPath.lastIndexOf('/') + 1)}`,
        // );
        // console.log('outStr', outStr.path);

        // inStr.pipe(outStr);
      }

      formattedRecords.push({
        name,
        profilePhoto: `${outputFolderPath}/images/${photoPath.slice(photoPath.lastIndexOf('/'))}`,
      });
    });

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
