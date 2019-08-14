import { isObject } from 'lodash';

export const addedGap = num => ' '.repeat(num);

export const buildLine = (key, value, sign = ' ') => `${sign} ${key}: ${value}`;

export const buildValue = data => (isObject(data)
  ? `{\n${Object.entries(data).map(([key, value]) => buildLine(key, value))}\n}`
  : data);
