import toPlain from './plain';
import toTree from './tree';
import toJson from './json';


export default (format, data) => {
  const typeFormat = {
    plain: toPlain,
    tree: toTree,
    json: toJson,
  };
  const messageUndefinedFormat = new Error(`${format} not known. Supported formats: plain/json/tree(default).`);
  return typeFormat[format](data) || messageUndefinedFormat;
};
