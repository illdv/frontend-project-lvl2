import fs from 'fs';
import genDiff from '..';


const after = fs.readFileSync(`${__dirname}/__fixtures__/after.json`);
const before = fs.readFileSync(`${__dirname}/__fixtures__/before.json`);

test('json diff', () => {
  expect(genDiff(after, before)).toEqual('{\nhost: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n- follow: false\n}');
});
