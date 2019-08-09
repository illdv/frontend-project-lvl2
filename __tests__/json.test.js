import genDiff from '../src';


const actual = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;

const jsonData = [
  `${__dirname}/__fixtures__/before.json`,
  `${__dirname}/__fixtures__/after.json`,
  actual,
];

const yamlData = [
  `${__dirname}/__fixtures__/before.yaml`,
  `${__dirname}/__fixtures__/after.yaml`,
  actual,
];

const iniData = [
  `${__dirname}/__fixtures__/before.ini`,
  `${__dirname}/__fixtures__/after.ini`,
  actual,
];


test.each([jsonData, yamlData, iniData])(
  '.diff(%p, %p)',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);
