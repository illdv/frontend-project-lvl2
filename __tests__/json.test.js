import fs from 'fs';
import genDiff from '../src';

const expectedDiff = fs.readFileSync(`${__dirname}/expected`, 'UTF-8');

const jsonData = [
  `${__dirname}/__fixtures__/before.json`,
  `${__dirname}/__fixtures__/after.json`,
  expectedDiff,
];

// const yamlData = [
//   `${__dirname}/__fixtures__/before.yaml`,
//   `${__dirname}/__fixtures__/after.yaml`,
//   actual,
// ];

// const iniData = [
//   `${__dirname}/__fixtures__/before.ini`,
//   `${__dirname}/__fixtures__/after.ini`,
//   actual,
// ];


test.each([jsonData])(
  '.diff(%p, %p)',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);
