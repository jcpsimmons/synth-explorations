export const generateOctaves = (frequency, numberOctaves) => {
  const octaves = new Array(numberOctaves * 2 + 1).fill(0);
  const middleIndex = Math.round(numberOctaves / 2) + 1;
  octaves[middleIndex] = frequency;

  if (numberOctaves > 1) {
    // sub octaves
    let factor = 1;
    for (let i = middleIndex - 1; i > -1; i--) {
      factor = factor * 2;
      octaves[i] = frequency / factor;
      octaves[octaves.length - 1 - i] = frequency * factor;
    }
  }

  return octaves;
};

// 400 2
// [100,200,400,800,1600]
// [.25,.5,1,2,4]
