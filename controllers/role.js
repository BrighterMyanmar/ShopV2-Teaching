const DB = require('../models/role');
const PermitDB = require('../models/permit');
const Helper = require('../utils/helper');

let all = async (req, res, next) => {
   let result = await DB.find().populate('permits');
   Helper.fMsg(res, "All Roles", result);
}

let get = async (req, res, next) => {
   let result = await DB.findById(req.params.id);
   if (result) {
      Helper.fMsg(res, "Single Role", result);
   } else next(new Error("No role with that id"))
}

let add = async (req, res, next) => {
   let result = await DB.findOne({ name: req.body.name });
   if (result) {
      next(new Error("Role name is already in use!"));
   } else {
      let result = await new DB(req.body).save();
      Helper.fMsg(res, "Role Created", result);
   }
}

let patch = async (req, res, next) => {
   let dbRole = await DB.findById(req.params.id);
   if (dbRole) {
      await DB.findByIdAndUpdate(dbRole._id, req.body);
      let result = await DB.findById(dbRole);
      Helper.fMsg(res, "Rolw Patched", result);
   } else next(new Error("No role with that id"));
}

let drop = async (req, res, next) => {
   let dbRole = await DB.findById(req.params.id);
   if (dbRole) {
      await DB.findByIdAndDelete(dbRole._id);
      Helper.fMsg(res, "Role Deleted");
   } else next(new Error("No role with that id"));
}

let addPermit = async (req, res, next) => {
   let dbRole = await DB.findById(req.body.roleId);
   if (dbRole) {
      await DB.findByIdAndUpdate(dbRole._id, { $push: { permits: req.body.permitId } });
      Helper.fMsg(res, "Permit Added to Role");
   } else next(new Error("No role with that id"));
}
let removePermit = async (req, res, next) => {
   let dbRole = await DB.findById(req.body.roleId);
   if (dbRole) {
      await DB.findByIdAndUpdate(dbRole._id, { $pull: { permits: req.body.permitId } });
      Helper.fMsg(res, "Permit Remove From Role");
   } else next(new Error("No Role with that id"));
}
module.exports = {
   all,
   get,
   add,
   patch,
   drop,
   addPermit,
   removePermit
}