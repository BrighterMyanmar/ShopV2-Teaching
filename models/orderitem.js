const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
   order: { type: Schema.Types.ObjectId, ref: "order" },
   count: { type: Number, required: true },
   product: { type: Schema.Types.ObjectId, ref: "product", required: true },
   name: { type: String, required: true },
   images: { type: Array, required: true },
   price: { type: Number, required: true },
   discount: { type: Number, default: 0 },
   status: { type: Boolean, defalt: false },
   create: { type: Date, default: Date.now }
});

const OrderItem = mongoose.model('orderitem', OrderItemSchema);

module.exports = OrderItem;