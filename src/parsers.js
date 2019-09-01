import yaml from 'js-yaml';
import ini from 'ini';

const formats = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (data1, data2) => [data1, data2]
  .map(({ type, body }) => formats[type](body));
