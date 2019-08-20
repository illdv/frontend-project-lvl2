import toPlain from './plain';
import toTree from './tree';


export default (format, data) => {
  const typeFormat = {
    plain: toPlain(data),
    tree: toTree(data),
  };
  const messageUndefinedFormat = new Error(`${format} not known. Supported formats: plain/json/tree(default).`);
  return typeFormat[format] || messageUndefinedFormat;
};
