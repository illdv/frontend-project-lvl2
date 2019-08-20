import { has, isObject, identity } from 'lodash';

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
      beforeValue: data1[key],
      afterValue: data2[key],
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


const buildAst = (data1, data2) => {
  const joinData = Object.keys({ ...data1, ...data2 }).sort();
  return joinData.map((key) => {
    const { type, process } = findDiffType(key, data1, data2)
      .find(({ check }) => check);
    return {
      type, key, ...process(buildAst),
    };
  });
};

export default buildAst;
