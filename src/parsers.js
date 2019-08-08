import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const formats = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
};

export default filePaths => filePaths
  .map((filePath) => {
    const extension = path.extname(filePath);
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return formats[extension](data);
  });
