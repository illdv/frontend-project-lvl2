import { isObject } from 'lodash';


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
    name, value: { oldValue, newValue }, gap,
  }) => {
    const signs = ['-', '+'];
    return [oldValue, newValue].map((value, index) => `${buildLine(name, value, gap, signs[index])}`).join('\n');
  },
  unchanged: ({ name, value, gap }) => `${buildLine(name, value, gap)}`,
};

const toTree = (data, gap = 2) => {
  const result = data.map(({ type, ...args }) => {
    const nodeData = { ...args, gap, toTree };
    return getTypeDiff[type](nodeData);
  }).join('\n');
  return `{\n${result}\n${addedGap(gap === 0 ? gap : gap - 2)}}`;
};
export default toTree;
