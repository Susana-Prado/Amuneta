const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    cart: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    subtotal: Number,
    shipping: Number,
    total: Number
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;