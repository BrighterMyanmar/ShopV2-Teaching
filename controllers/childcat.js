const DB = require('../models/childcat');
const SubCatDB = require('../models/subcat');
const Helper = require('../utils/helper');

let all = async (req, res, next) => {
   let result = await DB.find();
   Helper.fMsg(res, "All Child Cats", result);
}

let add = async (req, res, next) => {
   let result = await new DB(req.body).save();
   await SubCatDB.findByIdAndUpdate(result.subcatid, { $push: { childcats: result._id } });
   Helper.fMsg(res, "Child Cat Added", result);
}
let get = async (req, res, next) => {
   let result = await DB.findById(req.params.id);
   if (result) {
      Helper.fMsg(res, "Single Child Cat", result);
   } else next(new Error("No Child Cat with that id"));
}
let patch = async (req, res, next) => {
   let dbChildCat = await DB.findById(req.params.id);
   if (dbChildCat) {
      await DB.findByIdAndUpdate(dbChildCat._id, req.body);
      let result = await DB.findById(dbChildCat._id);
      Helper.fMsg(res, "Single Child Cat", result);
   } else next(new Error("No Child Cat with that id"));
}
let drop = async (req, res, next) => {
   let dbChildCat = await DB.findById(req.params.id);
   if (dbChildCat) {
      await SubCatDB.findByIdAndUpdate(dbChildCat.subcatid, { $pull: { childcats: dbChildCat._id } });
      await DB.findByIdAndDelete(dbChildCat._id);

      Helper.fMsg(res, "Child Cat Deleted");
   } else next(new Error("No Child Cat with that id"));
}

module.exports = {
   all,
   add,
   get, patch, drop
}