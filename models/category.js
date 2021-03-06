const mongoose = require('mongoose');
const { Schema } = mongoose;
const CategorySchema = new Schema({
   name: { type: String, unique: true, require: true },
   image: { type: String, require: true },
   subcats: [{type:Schema.Types.ObjectId, ref:"subcat"}],
   created: { type: Date, default: Date.now }
});
const Category = mongoose.model('category', CategorySchema);

module.exports = Category;
