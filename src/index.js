import parseInputData from './parsers';
import makeAst from './makeAst';
import render from './render';


export default (pathToFile1, pathToFile2) => {
  const [data1, data2] = parseInputData([pathToFile1, pathToFile2]);
  const ast = makeAst(data1, data2);
  return render(ast);
};
