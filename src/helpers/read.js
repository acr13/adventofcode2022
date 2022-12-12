import { readFileSync } from 'node:fs'

export const readFile = (file) => {
  return readFileSync(`./inputs/${file}`, 'utf-8')
  .split(/\r?\n/)
};

export const readFileToIntegers = (file) => readFile(file).map(Number);

export const readFileToGrid = (file) => readFile(file)
  .map(line => line.split(''));

export const readFileToGridIntegers = (file) => readFile(file)
  .map(line => line.split('').map(Number));