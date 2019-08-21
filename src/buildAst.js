import { has, isObject, identity } from 'lodash';

const dataTypes = [
  {
    type: 'nested',
    check: (key, data1, data2) => isObject(data1[key]) && isObject(data2[key]),
    getNodeValue: (oldValue, newValue, fn) => fn(oldValue, newValue),
  },
  {
    type: 'added',
    check: (key, data1, data2) => !has(data1, key) && has(data2, key),
    getNodeValue: (oldValue, newValue) => identity(newValue),
  },
  {
    type: 'deleted',
    check: (key, data1, data2) => has(data1, key) && !has(data2, key),
    getNodeValue: oldValue => identity(oldValue),
  },
  {
    type: 'updated',
    check: (key, data1, data2) => has(data1, key) && has(data2, key)
    && data1[key] !== data2[key],
    getNodeValue: (oldValue, newValue) => ({ oldValue, newValue }),
  },
  {
    type: 'unchanged',
    check: (key, data1, data2) => has(data1, key) && has(data2, key)
    && data1[key] === data2[key],
    getNodeValue: oldValue => identity(oldValue),
  },
];


const buildAst = (data1, data2) => {
  const joinData = Object.keys({ ...data1, ...data2 }).sort();
  return joinData.map((key) => {
    const { type, getNodeValue } = dataTypes.find(({ check }) => check(key, data1, data2));
    const value = getNodeValue(data1[key], data2[key], buildAst);
    return {
      name: key, value, type,
    };
  });
};

export default buildAst;
