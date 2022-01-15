const DB = require('../models/user');
const Helper = require('../utils/helper');

let register = async (req, res, next) => {
   let emailUser = await DB.findOne({ email: req.body.email });
   if (emailUser) {
      next(new Error("Email is already in use"));
      return;
   }
   let phoneUser = await DB.findOne({ phone: req.body.phone });
   if (phoneUser) {
      next(new Error("Phone is already in use"));
      return;
   }

   req.body.password = Helper.encode(req.body.password);
   let result = await new DB(req.body).save();
   Helper.fMsg(res, "Register Success", result);
}

let login = async (req, res, next) => {
   let phoneUser = await DB.findOne({ phone: req.body.phone }).select('-__v');
   if (phoneUser) {
      if (Helper.comparePass(req.body.password, phoneUser.password)) {
         let user = phoneUser.toObject();
         delete user.password;
         user.token = Helper.makeToken(user);
         Helper.fMsg(res, "Login Success", user);
      } else {
         next(new Error("Creditial Error"));
      }
   } else {
      next(new Error("Creditial Error"));
   }
}

let patch = async (req, res, next) => {
   let dbUser = await DB.findById(req.params.id);
   if (dbUser) {
      if (req.body.password) {
         req.body.password = Helper.encode(req.body.password);
      }
      await DB.findByIdAndUpdate(dbUser._id, req.body);
      let result = await DB.findById(dbUser._id);
      Helper.fMsg(res, "User Updated", result);
   } else next(new Error("No User with that id!"));
}

let addRole = async (req, res, next) => {
   let roleId = req.body.roleId;

   let user = await DB.findById(req.body.userId);

   let found = user.roles.find(role => role == roleId);
   if (found) {
      next(new Error("Role is already in user"));
   } else {
      await DB.findByIdAndUpdate(user._id, { $push: { roles: roleId } });
      Helper.fMsg(res, "Role Added to User");
   }

}

module.exports = {
   register,
   login,
   patch,
   addRole
}