const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const categorySchema = Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    minLength: [3, "Category name must be at least 3 characters long"],
    maxLength: [20, "Category name must be at most 20 characters long"],
    unique: true,
  },
});

module.exports = model("Category", categorySchema);
