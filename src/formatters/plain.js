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
  nested: ({ children, pathName, toPlain }) => toPlain(children, `${pathName}.`),
  added: ({ newValue, pathName }) => `Property '${pathName}' was added with value: ${determineTypeValue(newValue)}`,
  deleted: ({ pathName }) => `Property '${pathName}' was removed`,
  updated: ({ oldValue, newValue, pathName }) => `Property '${pathName}' was updated. From ${determineTypeValue(oldValue)} to ${determineTypeValue(newValue)}`,
  unchanged: () => null,
};

const toPlain = (data, path = '') => {
  const result = data.map(({ type, ...args }) => {
    const pathName = path + args.name;
    const nodeData = { ...args, pathName, toPlain };
    return buildLine[type](nodeData);
  });
  return result.filter(r => r).join('\n');
};


export default toPlain;
