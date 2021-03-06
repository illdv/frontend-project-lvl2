import yaml from 'js-yaml';
import ini from 'ini';

const formats = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (typeData, body) => formats[typeData](body);
