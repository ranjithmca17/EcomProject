// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   userId: String,
//   cartId: String,
//   cartItems: [
//     {
//       productId: String,
//       title: String,
//       image: String,
//       price: String,
//       quantity: Number,
//     },
//   ],
//   addressInfo: {
//     addressId: String,
//     address: String,
//     city: String,
//     pincode: String,
//     phone: String,
//     notes: String,
//   },
//   orderStatus: String,
//   paymentMethod: String,
//   paymentStatus: String,
//   totalAmount: Number,
//   orderDate: Date,
//   orderUpdateDate: Date,
//   paymentId: String,
//   payerId: String,
// });

// module.exports = mongoose.model("Order", OrderSchema);



const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentStatus: String, // Payment status is now being tracked (e.g., 'paid', 'pending')
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
});

module.exports = mongoose.model("Order", OrderSchema);
