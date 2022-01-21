export const trimText = (text: string, numOfChars: number = 200): string => {
  return text.length > numOfChars
    ? text.slice(0, numOfChars + 1) + '...'
    : text;
};
