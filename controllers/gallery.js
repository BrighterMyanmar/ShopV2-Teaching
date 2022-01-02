const DB = require('../models/gallery');
const Helper = require('../utils/helper');

let saveFile = async (req, res, next) => {
   let Obj = {
      image: req.body.image,
      link: `http://${process.env.IP_ADD}:${process.env.PORT}/uploads/${req.body.image}`
   }
   let result = await new DB(Obj).save();
   Helper.fMsg(res, "Single File Save", result);
}

let saveFiles = async (req, res, next) => {
   let images = req.body.images;
   let results = [];
   for await (let image of images) {
      let Obj = {
         image: image,
         link: `http://${process.env.IP_ADD}:${process.env.PORT}/uploads/${image}`
      }
      let result = await new DB(Obj).save();
      results.push(result);
   }
   Helper.fMsg(res, "Multiple Files Save", results);
}

let paginate = async (req, res, next) => {
   let page = Number(req.params.page);
   let limit = 5;
   let skipCount = page == 1 ? 0 : (page - 1) * limit;
   let result = await DB.find().skip(skipCount).limit(limit);
   Helper.fMsg(res, "Paginated Images", result);
}

module.exports = {
   saveFile,
   saveFiles,
   paginate
}