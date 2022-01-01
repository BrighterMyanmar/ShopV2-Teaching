const mongoose = require('mongoose');
const { Schema } = mongoose;
const WarrantySchema = new Schema({
   name: { type: String, unique: true, require: true },
   image: { type: String, require: true },
   remark: { type: Array }
});
const Warranty = mongoose.model('warranty', WarrantySchema);

module.exports = Warranty;