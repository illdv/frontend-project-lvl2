import toPlain from './plain';
import toTree from './tree';
import toJson from './json';

const printMessage = (e, message) => {
  console.log(message);
  return e;
};

export default (format, data) => {
  const typesOfFormats = {
    plain: toPlain,
    tree: toTree,
    json: toJson,
  };
  try {
    return typesOfFormats[format](data);
  } catch (e) {
    throw printMessage(e, `${format} not known. Supported formats: plain/json/tree(default).`);
  }
};
