import { buildValue, buildLine, addedGap } from './helpers';

const typeDiff = {
  nested: ({
    key, children,
  }, gap, fn) => `${addedGap(gap === 2 ? gap : gap + 2)}${key}: {\n${fn(children, gap + 2)}\n${addedGap(gap)}}`,
  added: ({ key, value }, gap) => `${addedGap(gap === 2 ? gap - 2 : gap)}${buildLine(key, buildValue(value, gap), '+')}`,
  deleted: ({ key, value }, gap) => `${addedGap(gap === 2 ? gap - 2 : gap)}${buildLine(key, buildValue(value, gap), '-')}`,
  updated: ({ key, value: { first, second } }, gap) => `${addedGap(gap === 2 ? gap - 2 : gap)}${buildLine(key, buildValue(first, gap), '-')}\n${addedGap(gap)}${buildLine(key, buildValue(second, gap), '+')}`,
  saved: ({ key, value }, gap) => `${addedGap(gap === 2 ? gap - 2 : gap)}${buildLine(key, buildValue(value, gap), ' ')}`,
};

const buildDiff = (data, gap = 2) => {
  const foo = data
    .reduce((acc, { type, ...args }) => [...acc, typeDiff[type](args, gap, buildDiff)], []);
  return foo.join('\n');
};
export default buildDiff;
