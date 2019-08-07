import { has } from 'lodash';
import fs from 'fs';

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
    operation: (key, data1, data2) => ({
      type: 'updated',
      key,
      values: [data2[key], data1[key]],
      signs: ['+', '-'],
    }),
    check: (data1, data2, key) => has(data1, key) && has(data2, key)
    && data1[key] !== data2[key],
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

const buildAst = (data1, data2) => Object.keys({ ...data1, ...data2 })
  .map(key => getProperty(data1, data2, key).operation(key, data1, data2));

const getValues = (signs, values, buildLine) => values
  .map((value, index) => buildLine(signs[index], value));
const buildLine = key => (sign, value) => `  ${sign} ${key}: ${value}`;

const render = (data) => {
  const result = data
    .reduce((acc, {
      type, key, sign, signs, value, values,
    }) => {
      const bindKeyOnLine = buildLine(key);
      return [...acc, type === 'updated'
        ? [...getValues(signs, values, bindKeyOnLine)]
        : bindKeyOnLine(sign, value)];
    }, []);
  return `{\n${[...result]}\n}`.replace(/,/gi, '\n');
};

export default (pathToFile1, pathToFile2) => {
  const data1 = JSON.parse(fs.readFileSync(pathToFile1, { encoding: 'utf-8' }));
  const data2 = JSON.parse(fs.readFileSync(pathToFile2, { encoding: 'utf-8' }));
  return render(buildAst(data1, data2));
};
