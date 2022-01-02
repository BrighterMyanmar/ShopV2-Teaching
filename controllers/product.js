const DB = require('../models/product');
const Helper = require('../utils/helper');

let all = async (req, res, next) => {
   let result = await DB.find().populate('cat subcat childcat tag delivey warranty');
   Helper.fMsg(res, "All Products", result);
}

let add = async (req, res, next) => {
   let result = await new DB(req.body).save();
   Helper.fMsg(res, "Product Saved", result);
}

module.exports = {
   all,
   add
}