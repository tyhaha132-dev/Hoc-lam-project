module.exports = (query) => {
  let objectSeacrh = {
    keyword: "",
  };

  if (query.keyword) {
    objectSeacrh.keyword = query.keyword;

    const regex = new RegExp(objectSeacrh.keyword, "i");

    objectSeacrh.regex = regex;
  }

  return objectSeacrh;
};
