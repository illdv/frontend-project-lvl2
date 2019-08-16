import { isObject } from 'lodash';


export const addedGap = num => ' '.repeat(num);

export const stringify = (data, gap) => {
  if (!isObject(data)) {
    return data;
  }
  const entriesString = Object.entries(data)
    .map(([key, value]) => `${addedGap(gap + 4)}  ${key}: ${value}`);

  return `{\n${entriesString}\n${addedGap(gap + 2)}}`;
};

export const buildLine = (key, value, gap, sign = ' ') => {
  const newValue = stringify(value, gap);
  return `${addedGap(gap)}${sign} ${key}: ${newValue}`;
};


const typeDiff = (key, gap) => ({
  nested: ({ children }, fn) => buildLine(key, fn(children, gap + 4), gap),
  added: ({ value }) => buildLine(key, value, gap, '+'),
  deleted: ({ value }) => buildLine(key, value, gap, '-'),
  updated: ({ value: values }) => values.map((value, index) => {
    const signs = ['-', '+'];
    return `${buildLine(key, value, gap, signs[index])}`;
  }).join('\n'),
  saved: ({ value }) => `${buildLine(key, value, gap)}`,
});

const buildDiff = (data, gap = 0) => {
  const foo = data
    .map(({ type, key, ...args }) => typeDiff(key, gap)[type](args, buildDiff));

  const joinedResult = foo.join('\n');
  return `{\n${joinedResult}\n${addedGap(gap === 0 ? gap : gap - 2)}}`;
};
export default buildDiff;
