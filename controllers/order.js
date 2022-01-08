const DB = require('../models/order');
const OrderItemDB = require('../models/orderitem');
const ProductDB = require('../models/product');
const Helper = require('../utils/helper');

let add = async (req, res, next) => {
   let items = req.body.items;

   let saveOrder = new DB();
   let orderTotal = 0;

   let orderItemObjs = [];
   for await (let item of items) {
      let product = await ProductDB.findById(item.id);
      let Obj = {
         order: saveOrder._id,
         count: item.count,
         product: product._id,
         name: product.name,
         images: product.images,
         price: product.price,
         discount: product.discount
      }
      orderTotal += product.price * item.count;
      orderItemObjs.push(Obj);
   }

   let orderItemsResults = await OrderItemDB.insertMany(orderItemObjs);
   let orderItemIds = orderItemsResults.map(oitem => oitem._id);

   saveOrder.count = orderItemIds.length;
   saveOrder.user = "61d968bf3493f17007179d8c";
   saveOrder.total = orderTotal;
   saveOrder.items = orderItemIds;

   let result = await saveOrder.save();

   Helper.fMsg(res, "Order Uploaded", result);

}

let getMyOrders = async(req,res,next) =>{
   let orders = await DB.find({user:"61d968bf3493f17007179d8c"});
   Helper.fMsg(res,"All My Orders",orders);
}

module.exports = {
   add,
   getMyOrders
}