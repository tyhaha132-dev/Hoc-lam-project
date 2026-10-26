const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
const systemcongfig = require("../../config/system");

module.exports = (app) => {
  const PATH_ADMIN = systemcongfig.prefixAdmin;

  app.use(PATH_ADMIN + "/dashboard", dashboardRouter);

  app.use(PATH_ADMIN + "/products", productRouter);
};
