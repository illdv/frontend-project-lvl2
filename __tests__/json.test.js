import fs from 'fs';
import genDiff from '../src';


const makeTestData = expansions => expansions.map((expansion) => {
  const expected = fs.readFileSync(`${__dirname}/expected`, 'UTF-8');
  return [
    `${__dirname}/__fixtures__/before.${expansion}`,
    `${__dirname}/__fixtures__/after.${expansion}`,
    expected,
  ];
});
test.each(makeTestData(['json', 'yaml', 'ini']))('diff:\n%p,\n%p', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});
