const DB = require('../models/subcat');
const CatDB = require('../models/category');
const Helper = require('../utils/helper');

let all = async (req, res, next) => {
   let result = await DB.find();
   Helper.fMsg(res, "All Sub Categories", result);
}

let get = async (req, res, next) => {
   let result = await DB.findById(req.params.id);
   Helper.fMsg(res, "Single Sub Cat", result);
}

let add = async (req, res, next) => {
   let dbCat = await CatDB.findById(req.body.catid);
   if (dbCat) {
      let result = await new DB(req.body).save();
      await CatDB.findByIdAndUpdate(dbCat._id, { $push: { subcats: result._id } });
      Helper.fMsg(res, "Sub Category Created", result);
   } else next(new Error("No category with that id"));

}

let patch = async (req, res, next) => {
   let dbSubcat = await DB.findById(req.params.id);
   let dbCat = await CatDB.findById(dbSubcat.catid);
   await CatDB.findByIdAndUpdate(dbCat._id, { $pull: { subcats: dbSubcat._id } });
   if (dbSubcat) {
      await DB.findByIdAndUpdate(dbSubcat._id, req.body);
      await CatDB.findByIdAndUpdate(req.body.catid, { $push: { subcats: dbSubcat._id } });
      let updateSubCat = await DB.findById(dbSubcat._id);
      Helper.fMsg(res, "Single Category Updated", updateSubCat);
   } else next(new Error("No category with that id"));
}

let drop = async (req, res, next) => {
   let dbSubcat = await DB.findById(req.params.id);
   if (dbSubcat) {
      let Cat = await CatDB.findById(dbSubcat.catid);
      await CatDB.findByIdAndUpdate(Cat._id, { $pull: { subcats: dbSubcat._id } });
      await DB.findByIdAndDelete(dbSubcat._id);
      Helper.fMsg(res, "Sub Category Dropped!");
   } else next(new Error("No category with that id"));

}

module.exports = {
   all,
   get,
   add,
   patch,
   drop
}
