const DB = require('../models/delivery');
const Helper = require('../utils/helper');

let all = async (req, res, next) => {
   let result = await DB.find();
   Helper.fMsg(res, "All Deliveries", result);
}
let get = async (req, res, next) => {
   let result = await DB.findById(req.params.id);
   Helper.fMsg(res, "Single Delivery", result);
}
let add = async (req, res, next) => {
   let result = await new DB(req.body).save();
   Helper.fMsg(res, "New Delivery Created", result);
}

let patch = async (req, res, next) => {
   let dbDelivery = await DB.findById(req.params.id);
   if (dbDelivery) {
      await DB.findByIdAndUpdate(dbDelivery._id, req.body);
      let result = await DB.findById(dbDelivery._id);
      Helper.fMsg(res, "Patched Delivery", result);
   } else {
      next(new Error("No delivery with that id"));
   }
}
let drop = async (req, res, next) => {
   let dbDelivery = await DB.findById(req.params.id);
   if (dbDelivery) {
      await DB.findByIdAndDelete(dbDelivery._id);
      Helper.fMsg(res, "Delivery Dropped");
   } else {
      next(new Error("No delivery with that id"));
   }
}

module.exports = {
   all,
   get,
   add,
   patch,
   drop
}