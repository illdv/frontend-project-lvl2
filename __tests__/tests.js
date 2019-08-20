import fs from 'fs';
import genDiff from '../src';


const makeTestData = format => ['json', 'yaml', 'ini'].map((expansion) => {
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/expected/${format}`, 'UTF-8');
  return [
    `${__dirname}/__fixtures__/before.${expansion}`,
    `${__dirname}/__fixtures__/after.${expansion}`,
    expected,
  ];
});
['tree', 'plain', 'json']
  .map(format => test.each(makeTestData(format))(`diff in ${format}:\n%p,\n%p`, (a, b, expected) => {
    expect(genDiff(a, b, format)).toBe(expected);
  }));
