const hashtagRegEx = /#[a-zA-ZÀ-ÿ0-9_-]+/g;

function cleanString(string) {
  const cleannedString = string
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .slice(1);
  return cleannedString;
}

function getCleanHashtags({ description }) {
  const hashtagsList = description.match(hashtagRegEx);
  const cleanHashtagsList = hashtagsList
    .map(hashtag => cleanString(hashtag));
  return cleanHashtagsList;
}

function getSplittedDescription({ description }) {
  const splittedString = description.split(" ");
  const splittedArray = [];
  splittedString.map(stringPart => {
    const matchedStrings = stringPart.match(hashtagRegEx);
    if (matchedStrings) {
      matchedStrings.map(stringSubPart => {
        splittedArray.push({ string: " ", isHashtag: false });
        const cleanStringSubPart = cleanString(stringSubPart);
        splittedArray.push({ string: cleanStringSubPart, isHashtag: true });
      });
    } else {
      splittedArray.push({ string: " ", isHashtag: false });
      splittedArray.push({ string: stringPart, isHashtag: false });
    }
  });
  splittedArray.shift();
  return splittedArray;
}

export {
  getCleanHashtags,
  getSplittedDescription
};