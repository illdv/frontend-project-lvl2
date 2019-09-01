import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAst from './buildAst';
import render from './formatters';

const getContents = (path1, path2) => [path1, path2]
  .map(currentPath => ({
    body: fs.readFileSync(currentPath, { encoding: 'utf-8' }),
    type: path.extname(currentPath).substring(1),
  }));


export default (pathToFile1, pathToFile2, format) => {
  const [content1, content2] = getContents(pathToFile1, pathToFile2);
  const [data1, data2] = parse(content1, content2);
  const ast = buildAst(data1, data2);
  return render(format, ast);
};
