import { has, isObject, identity } from 'lodash';
import parseInputData from './parsers';
import buildDiff from './buildDiff';


const findDiffType = (key, data1, data2) => ([
  {
    type: 'nested',
    check: isObject(data1[key]) && isObject(data2[key]),
    process: fn => ({
      children: fn(data1[key], data2[key]),
    }),
  },
  {
    type: 'added',
    check: !has(data1, key) && has(data2, key),
    process: () => ({
      value: identity(data2[key]),
    }),
  },
  {
    type: 'deleted',
    check: has(data1, key) && !has(data2, key),
    process: () => ({
      value: identity(data1[key]),
    }),
  },

  {
    type: 'updated',
    check: has(data1, key) && has(data2, key)
    && data1[key] !== data2[key],
    process: () => ({
      value: [data1[key], data2[key]],
    }),
  },
  {
    type: 'saved',
    check: has(data1, key) && has(data2, key)
    && data1[key] === data2[key],
    process: () => ({
      value: identity(data1[key]),
    }),
  },
]);


const parse = (data1, data2) => {
  const joinData = Object.keys({ ...data1, ...data2 }).sort();
  const ast = joinData.map((key) => {
    const { type, process } = findDiffType(key, data1, data2)
      .find(({ check }) => check);
    const { value, children } = process(parse);
    return {
      type, key, value, children,
    };
  });
  return ast;
};


export default (pathToFile1, pathToFile2) => {
  const foo = parse(...parseInputData([pathToFile1, pathToFile2]));
  const foo1 = buildDiff(foo);
  return foo1;
};
