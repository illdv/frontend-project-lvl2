import { isObject } from 'lodash';


const addedGap = num => ' '.repeat(num);

const buildValue = (data, gap) => {
  const entriesString = Object.entries(data)
    .map(([key, value]) => `${addedGap(gap + 4)}  ${key}: ${value}`);
  return `{\n${entriesString}\n${addedGap(gap + 2)}}`;
};

const buildLine = (key, value, gap, sign = ' ') => {
  const newValue = isObject(value) ? buildValue(value, gap) : value;
  return `${addedGap(gap)}${sign} ${key}: ${newValue}`;
};

const typeDiff = (key, gap) => ({
  nested: ({ children }, fn) => buildLine(key, fn(children, gap + 4), gap),
  added: ({ value }) => buildLine(key, value, gap, '+'),
  deleted: ({ value }) => buildLine(key, value, gap, '-'),
  updated: ({ afterValue, beforeValue }) => {
    const signs = ['-', '+'];
    return [beforeValue, afterValue]
      .map((value, index) => `${buildLine(key, value, gap, signs[index])}`).join('\n');
  },
  saved: ({ value }) => `${buildLine(key, value, gap)}`,
});

const toTree = (data, gap = 2) => {
  const result = data
    .map(({ type, key, ...args }) => {
      const selectedDiff = typeDiff(key, gap)[type];
      return selectedDiff(args, toTree);
    }).join('\n');
  return `{\n${result}\n${addedGap(gap === 0 ? gap : gap - 2)}}`;
};
export default toTree;
