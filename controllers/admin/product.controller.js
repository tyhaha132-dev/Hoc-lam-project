const Product = require("../../models/product.model");
const filterStatusHelpers = require("../../helpers/filterStatus");
const searchHelpers = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  // Tìm kiếm
  const search = searchHelpers(req.query);

  if (search.regex) {
    find.title = search.regex;
  }

  // Bộ lọc
  const filterStatus = filterStatusHelpers(req.query);

  if (req.query.status) {
    find.status = req.query.status;
  }

  // Phân trang
  const countProduct = await Product.countDocuments(find);
  const pagination = paginationHelper(req.query, countProduct);

  // Query sản phẩm
  const products = await Product.find(find)
    .limit(pagination.limitItems)
    .skip(pagination.skip);

  // Truyen vao view
  res.render("admin/pages/products/index", {
    pageTitle: "Trang danh sach san pham",
    products: products,
    filterStatus: filterStatus,
    keyword: search.keyword,
    pagination: pagination,
  });
};
