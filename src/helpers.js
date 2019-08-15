import { isObject } from 'lodash';

export const addedGap = num => ' '.repeat(num);

export const buildLine = (key, value, sign = ' ') => `${sign} ${key}: ${value}`;

export const buildValue = (data, gap) => (isObject(data)
  ? `{\n${Object.entries(data).map(([key, value]) => addedGap(gap === 2 ? gap + 2 : gap + 4) + buildLine(key, value))}\n${addedGap(gap === 2 ? gap : gap + 2)}}`
  : data);
