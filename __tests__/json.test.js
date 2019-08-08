import genDiff from '../src';


const afterJSONPath = `${__dirname}/__fixtures__/after.json`;
const beforeJSONPath = `${__dirname}/__fixtures__/before.json`;

const afterYAMLPath = `${__dirname}/__fixtures__/after.yaml`;
const beforeYAMLPath = `${__dirname}/__fixtures__/before.yaml`;

test('json diff', () => {
  expect(genDiff(beforeJSONPath, afterJSONPath)).toBe(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`);
});

test('yaml diff', () => {
  expect(genDiff(beforeYAMLPath, afterYAMLPath)).toBe(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`);
});
