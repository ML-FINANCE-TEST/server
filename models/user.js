const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      type: String,
      require: true,
      minlength: 3,
      maxlength: 30,
    },

    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
    assets: [
      {
        symbol: String,
        quantity: Number,
      },
    ],
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true }
);

// Define pre-save hook to hash the password
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

// // Method to compare passwords for authentication
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// Create the User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
