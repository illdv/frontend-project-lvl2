import { isObject, isString } from 'lodash';


const determineTypeValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const buildLine = keyPath => ({
  nested: ({ children }, fn) => fn(children, `${keyPath}.`),
  added: ({ value }) => `Property '${keyPath}' was added with value: ${determineTypeValue(value)}`,
  deleted: () => `Property '${keyPath}' was removed`,
  updated: ({ value: [value1, value2] }) => `Property '${keyPath}' was updated. From ${determineTypeValue(value1)} to ${determineTypeValue(value2)}`,
  saved: () => '',
});

const toPlain = (data, path = '') => {
  const result = data.map(({ type, ...args }) => {
    const selectedDiff = buildLine(path + args.key)[type];
    return selectedDiff({ ...args }, toPlain);
  });
  return result.filter(r => r).join('\n');
};


export default toPlain;
