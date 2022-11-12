export const generateNRandomNumbers = (min: number, max: number, randomCnt : number) => {
  const arr = [];
  while (arr.length < randomCnt) {
    const random = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(random) === -1) {
      arr.push(random);
    }
  }
  return arr;
};

export const pickNumberFromNRandomNumbers = (min: number, max: number, randomCnt : number) => {
  const arr = generateNRandomNumbers(min, max, randomCnt);
  const index = Math.floor(Math.random() * arr.length);
  return { arr, number: arr[index] };
};

export const capitalizeFirstLetter = (word: string) => {
    if (word) {
      word = word.replace("-", " ");
    }
    return word[0].toUpperCase() + word.slice(1);
  };