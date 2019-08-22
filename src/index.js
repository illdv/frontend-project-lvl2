import parse from './parsers';
import buildAst from './buildAst';
import render from './formatters';

export default (pathToFile1, pathToFile2, format) => {
  const data1 = parse(pathToFile1);
  const data2 = parse(pathToFile2);
  const ast = buildAst(data1, data2);
  return render(format, ast);
};
