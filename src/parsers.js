import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const extensions = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (filePath1, filePath2) => [filePath1, filePath2]
  .map((filePath) => {
    const extension = path.extname(filePath).substring(1);
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return extensions[extension](data);
  });
