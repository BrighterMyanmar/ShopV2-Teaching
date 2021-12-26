const DB = require('../models/permit');
const Helper = require('../utils/helper');

let all = async (req, res, next) => {
   let result = await DB.find();
   Helper.fMsg(res, "All Permits", result);
}

let add = async (req, res, next) => {
   let dbPermit = await DB.findOne({ name: req.body.name });
   if (dbPermit) {
      next(new Error("Permission with that name already exist!"));
   } else {
      let result = await new DB(req.body).save();
      Helper.fMsg(res, "Permit Created", result);
   }
}

let get = async (req, res, next) => {
   let result = await DB.findById(req.params.id);
   if (result) {
      Helper.fMsg(res, "Single Permit", result);
   } else next(new Error("No permission with that id"));
}

let patch = async (req, res, next) => {
   let dbPermit = await DB.findById(req.params.id);
   if (dbPermit) {
      await DB.findByIdAndUpdate(dbPermit._id, req.body);
      let result = await DB.findById(dbPermit._id);
      Helper.fMsg(res, "Permitssion Updated", result);
   } else next(new Error("No permission with that id"));
}

let drop = async (req, res, next) => {
   let dbPermit = await DB.findById(req.params.id);
   if (dbPermit) {
      await DB.findByIdAndDelete(dbPermit._id)
      Helper.fMsg(res, "Permitssion Dropped");
   } else next(new Error("No permission with that id"));
}


module.exports = {
   all,
   get,
   add,
   patch,
   drop
}