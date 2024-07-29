export const getRandNum = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const getRandInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

export const getRandBool = () => Math.random() > 0.5;
