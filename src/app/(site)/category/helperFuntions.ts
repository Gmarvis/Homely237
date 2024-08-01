let indexCount = 0;
export const randomArrayWithinRange = (images: string[], num: number): string[] => {
  if (indexCount > images.length) {
    indexCount = 0;
  }
  let randomImages = images.slice(indexCount, num);
  indexCount = indexCount + num;
  console.log(randomImages);
  return randomImages;
};
