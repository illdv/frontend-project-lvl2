import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAst from './buildAst';
import render from './formatters';

const getContent = filePath => ({
  body: fs.readFileSync(filePath, { encoding: 'utf-8' }),
  typeData: path.extname(filePath).substring(1),
});


export default (pathToFile1, pathToFile2, format) => {
  const data1 = pathToFile1 |> getContent |> (({ body, typeData }) => parse(typeData, body));
  const data2 = pathToFile2 |> getContent |> (({ body, typeData }) => parse(typeData, body));
  const ast = buildAst(data1, data2);
  return render(format, ast);
};
