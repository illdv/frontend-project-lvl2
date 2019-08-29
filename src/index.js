import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAst from './buildAst';
import render from './formatters';

const getContents = (path1, path2) => [path1, path2]
  .map(currentPath => ({
    body: fs.readFileSync(currentPath, { encoding: 'utf-8' }),
    extension: path.extname(currentPath).substring(1),
  }));


export default (pathToFile1, pathToFile2, format) => {
  const contents = getContents(pathToFile1, pathToFile2);
  const [data1, data2] = parse(contents);
  const ast = buildAst(data1, data2);
  return render(format, ast);
};
