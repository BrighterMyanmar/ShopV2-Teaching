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
   }
}