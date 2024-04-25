const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      minLength: [3, "Product name must be at least 3 characters long"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      mixLength: [
        1000,
        "Product description must be at least 1000 characters long",
      ],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      default: 0,
    },
    image_url: {
      type: String,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [{
      type: Schema.Types.ObjectId,
      ref: "Tag",
    }],
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
