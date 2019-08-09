import { has, union, isObject } from 'lodash';
import parser from './parsers';


const propertyOperations = [
  {
    operation: (key, data1, data2) => ({
      type: 'added',
      sign: '+',
      key,
      value: data2[key],
    }),
    check: (data1, data2, key) => !has(data1, key) && has(data2, key),
  },
  {
    operation: (key, data1) => ({
      type: 'deleted',
      sign: '-',
      key,
      value: data1[key],

    }),
    check: (data1, data2, key) => has(data1, key) && !has(data2, key),
  },
  {
    check: (data1, data2, key) => has(data1, key) && has(data2, key)
    && isObject(data1[key]) && isObject(data2[key]),
    operation: (key, data1, data2, process) => ({
      type: 'nested',
      sign: ' ',
      key,
      children: process(data1[key], data2[key]),
    }),
  },
  {
    check: (data1, data2, key) => has(data1, key) && has(data2, key)
    && data1[key] !== data2[key],
    operation: (key, data1, data2) => ({
      type: 'updated',
      key,
      values: [data2[key], data1[key]],
      signs: ['+', '-'],
    }),
  },
  {
    check: (data1, data2, key) => has(data1, key) && has(data2, key)
    && data1[key] === data2[key],
    operation: (key, data1) => ({
      type: 'saved',
      sign: ' ',
      key,
      value: data1[key],
    }),
  },

];

const getProperty = (data1, data2, key) => propertyOperations
  .find(({ check }) => check(data1, data2, key));

const buildAst = (data1, data2) => {
  const joinData = union(Object.keys(data1), Object.keys(data2));
  const ast = joinData.map(key => getProperty(data1, data2, key).operation(key, data1, data2, buildAst));
  return ast;
};
const getValues = (signs, values, buildLine) => values
  .map((value, index) => buildLine(signs[index], value));
const buildLine = key => (sign, value) => `  ${sign} ${key}: ${value}`;

const render = (data) => {
  console.log(data);
  const result = data
    .reduce((acc, {
      type, key, sign, signs, value, values, children,
    }) => {
      if (type === 'nested') {
        render(children);
      }
      const bindKey = buildLine(key);
      return [...acc, type === 'updated'
        ? [...getValues(signs, values, bindKey)]
        : bindKey(sign, value)];
    }, []);
  return `{\n${[...result]}\n}`.replace(/,/gi, '\n');
};

export default (pathToFile1, pathToFile2) => {
  const ast = buildAst(...parser([pathToFile1, pathToFile2]));
  return render(ast);
};
