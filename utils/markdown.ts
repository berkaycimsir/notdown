const WORDS_PER_MINUTE = 200;

export const wordCount = (content: string): number => {
  const regex = /\w+/g;

  const wordCount = Number((content || '').match(regex)?.length);

  return wordCount;
};

export const readingTime = (content: string): number => {
  const readingTime = Math.ceil(Number(wordCount(content)) / WORDS_PER_MINUTE);

  return readingTime;
};
