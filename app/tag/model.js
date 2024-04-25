const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const tagSchema = Schema({
  name: {
    type: String,
    required: [true, "Tag name is required"],
    minLength: [3, "Tag name must be at least 3 characters long"],
    maxLength: [20, "Tag name must be at most 20 characters long"],
    unique: true,
  },
});

module.exports = model("Tag", tagSchema);
