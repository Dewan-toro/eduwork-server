const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

let userSchema = Schema(
  {
    full_name: {
      type: String,
      required: true,
      maxLength: [50, "Full name must be less than 50 characters"],
      minLength: [3, "Full name must be more than 3 characters"],
    },
    customer_id: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: [50, "Email must be less than 50 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      maxLength: [50, "Password must be less than 50 characters"],
      minLength: [3, "Password must be more than 3 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: [String],
  },
  { timestamps: true }
);

userSchema.path("email").validate(
  function (value) {
    const EMAIL_RE = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} email is not valid`
);

userSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("User").countDocuments({ email: value });

      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} email already exists`
);

const HASH_ROUND = 10;

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

userSchema.plugin(AutoIncrement, {
  inc_field: "customer_id",
});

module.exports = model("User", userSchema);
