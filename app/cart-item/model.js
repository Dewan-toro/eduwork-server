const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const cartItemSchema = Schema({
  name: {
    type: String,
    minLength: [5, "Panjang nama minimal 5 karakter"],
    required: [true, "Nama tidak boleh kosong"],
  },
  price: {
    type: Number,
    default: 0,
    required: [true, "Harga tidak boleh kosong"],
  },
  qty: {
    type: Number,
    min: [1, "Quantity minimal 1"],
    required: [true, "Quantity tidak boleh kosong"],
  },
  image_url: {
    type: String,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("CartItem", cartItemSchema);
