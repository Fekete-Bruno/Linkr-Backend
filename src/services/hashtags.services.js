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
  const uniqueHashtagsList = [...new Set(cleanHashtagsList)];
  return uniqueHashtagsList;
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

function formatPostsByHashtag(selection) {
  const postIdList = selection.map(like => like.postId);
  const uniquePostIdList = [...new Set(postIdList)];
  const response = uniquePostIdList.map(postId => {
    const { url, description, userId, name, img } = selection
      .find(like => like.postId === postId);
    const likeArray = selection
      .filter(like => like.postId === postId)
      .map(like => ({
        userId: like.likeUserId,
        name: like.likeUserName
      }));
    const likes = likeArray[0].userId ? likeArray.length : 0;
    const post = {
      postId,
      url,
      description: getSplittedDescription({ description }),
      userId,
      name,
      img,
      likes,
      likeArray
    };
    return post;
  });
  return response;
}

export {
  getCleanHashtags,
  getSplittedDescription,
  formatPostsByHashtag
};