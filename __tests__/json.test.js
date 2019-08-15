import genDiff from '../src';


const actual = `{
  common: {
    + follow: false
      setting1: Value 1
    - setting2: 200
    - setting3: true
    + setting3: {
          key: value
      }
    + setting4: blah blah
    + setting5: {
          key5: value5
      }
      setting6: {
        key: value
      + ops: vops
    }
  }
  group1: {
    - baz: bas
    + baz: bars
      foo: bar
    - nest: {
          key: value
      }
    + nest: str
  }
- group2: {
      abc: 12345
  }
+ group3: {
      fee: 100500
  }
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


test.each([jsonData])(
  '.diff(%p, %p)',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);
