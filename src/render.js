import { isObject } from 'lodash';


const addedGap = num => ' '.repeat(num);

const buildValue = (data, gap) => {
  const entriesString = Object.entries(data)
    .map(([key, value]) => `${addedGap(gap + 4)}  ${key}: ${value}`);
  return `{\n${entriesString}\n${addedGap(gap + 2)}}`;
};

const stringify = (key, value, gap, sign = ' ') => {
  const newValue = isObject(value) ? buildValue(value, gap) : value;
  return `${addedGap(gap)}${sign} ${key}: ${newValue}`;
};


const typeDiff = (key, gap) => ({
  nested: ({ children }, fn) => stringify(key, fn(children, gap + 4), gap),
  added: ({ value }) => stringify(key, value, gap, '+'),
  deleted: ({ value }) => stringify(key, value, gap, '-'),
  updated: ({ value: values }) => values.map((value, index) => {
    const signs = ['-', '+'];
    return `${stringify(key, value, gap, signs[index])}`;
  }).join('\n'),
  saved: ({ value }) => `${stringify(key, value, gap)}`,
});

const buildDiff = (data, gap = 0) => {
  const result = data
    .map(({ type, key, ...args }) => {
      const selectedDiff = typeDiff(key, gap)[type];
      return selectedDiff(args, buildDiff);
    }).join('\n');
  return `{\n${result}\n${addedGap(gap === 0 ? gap : gap - 2)}}`;
};
export default buildDiff;
