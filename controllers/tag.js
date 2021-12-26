const DB = require('../models/tag');
const Helper = require('../utils/helper');
const { deleteFile } = require('../utils/gallery');

let all = async (req, res, next) => {
   let result = await DB.find();
   Helper.fMsg(res, "All Tags", result);
}

let get = async (req, res, next) => {
   let result = await DB.findById(req.params.id);
   if (result) {
      Helper.fMsg(res, "Single Category", result);
   } else {
      next(new Error("No Tag with that id"));
   }
}

let add = async (req, res, next) => {
   let saveData = new DB(req.body);
   let result = await saveData.save();
   Helper.fMsg(res, "Tag Created");
}

let patch = async (req, res, next) => {
   let dbCat = await DB.findById(req.params.id);
   if (dbCat) {
      dbCat.name = req.body.name;
      dbCat.image = req.body.image;
      await DB.findByIdAndUpdate(dbCat._id, dbCat);
      let result = await DB.findById(dbCat._id);
      Helper.fMsg(res, "Tag Updated", result);
   } else {
      next(new Error("No Tag with that id"));
   }
}

let drop = async (req, res, next) => {
   let dbCat = await DB.findById(req.params.id);
   if (dbCat) {
      await deleteFile(dbCat.image);
      await DB.findByIdAndDelete(dbCat._id);
      Helper.fMsg(res, "Tag Dropped");
   } else {
      next(new Error("No Tag with that id"));
   }
}

module.exports = {
   all,
   add,
   get,
   patch,
   drop
}