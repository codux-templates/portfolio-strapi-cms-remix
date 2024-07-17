const crypto = require('crypto');
const fs = require('fs');
const { argv } = require('node:process');
const os = require('os');
const path = require('path');

const strapiEnvPath = path.join(__dirname, 'packages', 'strapi', '.env');
const clientEnvPath = path.join(__dirname, 'packages', 'client', '.env.development.local');

if (fs.existsSync(strapiEnvPath) && fs.existsSync(clientEnvPath)) {
  console.error('The .env files already exist. Please delete them and run the script again.');
} else {
  const modifyEnvFile = (filePath, fieldsToModify) => {
    /* fieldsToModify = [[searchString, wantedValue]], e.g: [['[PORT]', 5000], ['[change-me]', 'randomValue']] */
    const currentValues = fs.readFileSync(filePath).toString().split('\n');
    let modifiedValues = currentValues;
    fieldsToModify.forEach(([searchString, wantedValue]) => {
      modifiedValues = modifiedValues.map((line) =>
        line.includes(searchString) ? line.replaceAll(searchString, wantedValue) : line,
      );
    });
    return modifiedValues.join('\n');
  };

  // taking care of the '.env' file related to the strapi package
  const strapiEnvValues = modifyEnvFile(path.join(__dirname, 'packages', 'strapi', '.env.example'), [
    ['[change-me]', () => crypto.randomBytes(16).toString('base64')],
    ['[PORT]', argv[2] || 5000],
  ]);
  fs.writeFileSync(strapiEnvPath, strapiEnvValues);

  const pkgJson = fs.readFileSync(path.join(__dirname, 'packages', 'strapi', 'package.json'), 'utf8');
  const pkgJsonObject = JSON.parse(pkgJson);
  pkgJsonObject.strapi.uuid = crypto.randomUUID();

  fs.writeFileSync(
    path.join(__dirname, 'packages', 'strapi', 'package.json'),
    JSON.stringify(pkgJsonObject, null, 2) + os.EOL,
  );

  // taking care of the '.env.local' file related to the client package
  const clientEnvValues = modifyEnvFile(path.join(__dirname, 'packages', 'client', '.env.example'), [
    ['[PORT]', argv[2] || 5000],
  ]);
  fs.writeFileSync(clientEnvPath, clientEnvValues);
}
