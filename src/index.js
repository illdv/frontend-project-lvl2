import parseInputData from './parsers';
import buildAst from './buildAst';
import formatters from './formatters';

export default (pathToFile1, pathToFile2, format) => {
  const [data1, data2] = parseInputData(pathToFile1, pathToFile2);
  const ast = buildAst(data1, data2);
  return formatters(format, ast);
};
