import toPlain from './plain';
import toTree from './tree';
import toJson from './json';


export default (format, data) => {
  const typesOfFormats = {
    plain: toPlain,
    tree: toTree,
    json: toJson,
  };
  try {
    return typesOfFormats[format](data);
  } catch (e) {
    throw new Error(`${format} not known. Supported formats: plain/json/tree(default).`);
  }
};
