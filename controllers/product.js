const DB = require('../models/product');
const Helper = require('../utils/helper');

let all = async (req, res, next) => {
   let result = await DB.find();
   Helper.fMsg(res, "All Products", result);
}

module.exports = {
   all
}