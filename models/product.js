const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
   name: { type: String, unique: true, required: true },
   price: { type: Number, required: true },
   brand: { type: String, required: true },
   images: { type: Array, required: true },
   cat: { type: Schema.Types.ObjectId, ref: "category" },
   subcat: { type: Schema.Types.ObjectId, ref: "subcat" },
   childcat: { type: Schema.Types.ObjectId, ref: "childcat" },
   tag: { type: Schema.Types.ObjectId, ref: "tag" },
   discount: { type: Number, default: 0 },
   features: { type: Array, required: true },
   desc: { type: String, required: true },
   detail: { type: String, required: true },
   status: { type: Boolean, default: true },
   delivey: [{ type: Schema.Types.ObjectId, ref: "delivery" }],
   warranty: [{ type: Schema.Types.ObjectId, ref: "warranty" }],
   colors: { type: Array, required: true },
   size: { type: String, required: true },
   rating: { type: String, required: true },
   created: { type: Date, default: Date.now }
});

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;