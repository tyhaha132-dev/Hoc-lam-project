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
    .sort({ position: "desc" })
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

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái thành công !");
  res.redirect(req.get("Referer") || "/admin/products");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: type });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} sản phẩm !`,
      );
      break;

    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() },
      );
      req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm !`);
      break;

    case "change-position":
      for (const item of ids) {
        const [id, positionStr] = item.split("-");
        const position = parseInt(positionStr);

        if (isNaN(position)) continue; // bỏ qua giá trị không hợp lệ

        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash("success", `Đổi vị trí thành công ${ids.length} sản phẩm !`);
      break;

    default:
      break;
  }

  res.redirect(req.get("Referer") || "/admin/products");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() },
  );
  req.flash("success", `Đã xóa thành công sản phẩm !`);
  res.redirect(req.get("Referer") || "/admin/products");
};
