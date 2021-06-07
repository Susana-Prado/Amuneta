const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: {
      street: String,
      number: Number,
      city: String,
      country: String,
    },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    currentCart: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
      },
    ],
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
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

const User = mongoose.model('User', userSchema);

module.exports = User;
