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

const buildLine = {
  nested: ({ value, namePath, toPlain }) => toPlain(value, `${namePath}.`),
  added: ({ value, namePath }) => `Property '${namePath}' was added with value: ${determineTypeValue(value)}`,
  deleted: ({ namePath }) => `Property '${namePath}' was removed`,
  updated: ({ value: { oldValue, newValue }, namePath }) => `Property '${namePath}' was updated. From ${determineTypeValue(oldValue)} to ${determineTypeValue(newValue)}`,
  unchanged: () => '',
};

const toPlain = (data, path = '') => {
  const result = data.map(({ type, ...args }) => {
    const namePath = path + args.name;
    const nodeData = { ...args, namePath, toPlain };
    return buildLine[type](nodeData);
  });
  return result.filter(r => r).join('\n');
};


export default toPlain;
