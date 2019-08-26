import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const formats = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (filePath) => {
  const extension = path.extname(filePath).substring(1);
  const contentFile = fs.readFileSync(filePath, { encoding: 'utf-8' });
  return formats[extension](contentFile);
};
