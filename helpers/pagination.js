module.exports = (query, countProduct) => {
  let objectPagination = {
    currentPage: 1,
    limitItems: 4,
  };

  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItems;

  objectPagination.totalPage = Math.ceil(
    countProduct / objectPagination.limitItems,
  );
  return objectPagination;
};
