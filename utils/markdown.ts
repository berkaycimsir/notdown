export const readingTime = (content: string): number => {
  const WORDS_PER_MINUTE = 200;

  const regex = /\w+/g;

  const wordCount = (content || '').match(regex)?.length;

  const readingTime = Math.ceil(Number(wordCount) / WORDS_PER_MINUTE);

  return readingTime;
};

export const wordCount = (content: string) => {
  const WORDS_PER_MINUTE = 200;

  const regex = /\w+/g;

  const wordCount = (content || '').match(regex)?.length;

  return wordCount;
};
