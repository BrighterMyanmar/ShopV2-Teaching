const Helper = require('../utils/helper');
const UserDB = require('../models/user');

module.exports = {
   validateBody: schema => {
      return (req, res, next) => {
         let result = schema.validate(req.body);
         if (result.error) {
            next(new Error(result.error.details[0].message));
         } else {
            next();
         }
      }
   },
   validateParam: (schema, name) => {
      return (req, res, next) => {
         let result = schema.validate({ id: req.params[name] });
         if (result.error) {
            next(new Error(result.error.details[0].message));
         } else {
            next();
         }
      }
   },
   validateToken: () => {
      return async (req, res, next) => {
         if (!req.headers.authorization) {
            next(new Error("No Bearer Token"));
         } else {
            await Helper.verifyToken(req, next);
         }
      }
   },
   validateRole: roleName => {
      return async (req, res, next) => {
         let bodyUser = req.body.user;
         let user = await UserDB.findById(bodyUser._id).populate('roles');
         let found = await user.roles.find(role => role.name == roleName);
         if (found) {
            next();
         } else {
            next(new Error("You don't have that permisssion!"));
         }
      }
   }
}