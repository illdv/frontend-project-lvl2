import { has } from 'lodash';
import toPlain from './plain';
import toTree from './tree';
import toJson from './json';


export default (format, data) => {
  const typesOfFormats = {
    plain: toPlain,
    tree: toTree,
    json: toJson,
  };
  const messageUndefinedFormat = new Error(`${format} not known. Supported formats: plain/json/tree(default).`);
  return has(typesOfFormats, format) ? typesOfFormats[format](data) : messageUndefinedFormat;
};
