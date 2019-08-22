import { isObject, flattenDeep } from 'lodash';


const addedGap = num => ' '.repeat(num);

const buildValue = (data, gap) => {
  const entriesString = Object.entries(data)
    .map(([name, value]) => `${addedGap(gap + 4)}  ${name}: ${value}`);
  return `{\n${entriesString}\n${addedGap(gap + 2)}}`;
};

const buildLine = (name, value, gap, sign = ' ') => {
  const newValue = isObject(value) ? buildValue(value, gap) : value;
  return `${addedGap(gap)}${sign} ${name}: ${newValue}`;
};

const getTypeDiff = {
  nested: ({
    name, value, gap, toTree,
  }) => buildLine(name, toTree(value, gap + 4), gap),
  added: ({ name, value, gap }) => buildLine(name, value, gap, '+'),
  deleted: ({ name, value, gap }) => buildLine(name, value, gap, '-'),
  updated: ({
    name, value, gap,
  }) => {
    const signs = ['-', '+'];
    const { oldValue, newValue } = value;
    return [oldValue, newValue].map((element, index) => `${buildLine(name, element, gap, signs[index])}`);
  },
  unchanged: ({ name, value, gap }) => `${buildLine(name, value, gap)}`,
};

const toTree = (data, gap = 2) => {
  const result = data.map(({ type, ...args }) => {
    const nodeData = { ...args, gap, toTree };
    return getTypeDiff[type](nodeData);
  });
  const lineByLine = flattenDeep(result).join('\n');
  return `{\n${lineByLine}\n${addedGap(gap === 0 ? gap : gap - 2)}}`;
};
export default toTree;
