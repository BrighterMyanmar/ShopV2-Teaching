const DB = require('../models/warranty');
const Helper = require('../utils/helper');

let all = async (req, res, next) => {
   let result = await DB.find();
   Helper.fMsg(res, "All Warranties", result);
}
let get = async (req, res, next) => {
   let result = await DB.findById(req.params.id);
   Helper.fMsg(res, "Single Warranty", result);
}
let add = async (req, res, next) => {
   let result = await new DB(req.body).save();
   Helper.fMsg(res, "New Warranty Created", result);
}

let patch = async (req, res, next) => {
   let dbWarranty = await DB.findById(req.params.id);
   if (dbWarranty) {
      await DB.findByIdAndUpdate(dbWarranty._id, req.body);
      let result = await DB.findById(dbWarranty._id);
      Helper.fMsg(res, "Patched Warranty", result);
   } else {
      next(new Error("No warranty with that id"));
   }
}
let drop = async (req, res, next) => {
   let dbWarranty = await DB.findById(req.params.id);
   if (dbWarranty) {
      await DB.findByIdAndDelete(dbWarranty._id);
      Helper.fMsg(res, "Warranty Dropped");
   } else {
      next(new Error("No warranty with that id"));
   }
}

module.exports = {
   all,
   get,
   add,
   patch,
   drop
}