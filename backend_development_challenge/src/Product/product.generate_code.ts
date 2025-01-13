export function generateProductCode(name: string): string {
  const fixedHash = 'p48asd4';

  const longestIncreasingSubstrings = (str: string) => {
    let maxLen = 0;
    let substrings: { substring: string; start: number; end: number }[] = [];
    let start = 0;

    for (let i = 0; i < str.length; i++) {
      if (i === 0 || str[i] > str[i - 1]) {
        if (i - start + 1 > maxLen) {
          maxLen = i - start + 1;
          substrings = [
            {
              substring: str.substring(start, i + 1),
              start: start,
              end: i,
            },
          ];
        } else if (i - start + 1 === maxLen) {
          substrings.push({
            substring: str.substring(start, i + 1),
            start: start,
            end: i,
          });
        }
      } else {
        start = i;
      }
    }

    return substrings;
  };

  const substringsInfo = longestIncreasingSubstrings(name.toLowerCase());

  const concatenatedSubstrings = substringsInfo.map((s) => s.substring).join('');
  const startIndex = substringsInfo[0].start;
  const endIndex = substringsInfo[substringsInfo.length - 1].end;

  return `${fixedHash}-${startIndex}${concatenatedSubstrings}${endIndex}`;
}