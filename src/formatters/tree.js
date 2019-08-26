import { isObject, flattenDeep } from 'lodash';


const addedGap = num => ' '.repeat(num * 4);

const buildValue = (data, depth) => {
  const entriesString = Object.entries(data)
    .map(([name, value]) => `${addedGap(depth + 0.5)}  ${name}: ${value}`);
  return `{\n${entriesString}\n${addedGap(depth)}}`;
};

const buildLine = (name, value, depth, sign = ' ') => {
  const newValue = isObject(value) ? buildValue(value, depth) : value;
  return `${addedGap(depth - 0.5)}${sign} ${name}: ${newValue}`;
};

const getTypeDiff = {
  nested: ({
    name, children, depth, toTree,
  }) => `${addedGap(depth)}${name}: ${toTree(children, depth + 1)}`,
  added: ({ name, newValue, depth }) => buildLine(name, newValue, depth, '+'),
  deleted: ({ name, oldValue, depth }) => buildLine(name, oldValue, depth, '-'),
  updated: ({
    name, oldValue, newValue, depth,
  }) => {
    const signs = ['-', '+'];
    return [oldValue, newValue].map((element, index) => `${buildLine(name, element, depth, signs[index])}`);
  },
  unchanged: ({ name, oldValue, depth }) => `${buildLine(name, oldValue, depth)}`,
};

const toTree = (data, depth = 1) => {
  const result = data.map(({ type, ...args }) => {
    const nodeData = { ...args, depth, toTree };
    return getTypeDiff[type](nodeData);
  });
  const lineByLine = flattenDeep(result).join('\n');
  return `{\n${lineByLine}\n${addedGap(depth - 1)}}`;
};
export default toTree;
