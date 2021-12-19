const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubCatSchema = new Schema({
   name: { type: String, unique = true, required: true },
   image: { type: String, required: true },
   catid: { type: Schema.Types.ObjectId, ref: "category" },
   created: { type: Date, default: Date.now }
});

const SubCat = mongoose.model('subcat', SubCatSchema);

module.exports = SubCat;