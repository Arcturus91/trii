const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
     /*  required: true */
      },
    lastName: {
      type: String,
      trim: true,
      /* required: true */
      },
      username: {
        type: String,
        // unique: true -> Ideally, should be unique, but its up to you
      },
    phoneNumber: Number,
    email: String,
    sex: String,
    investorType: String,
    profile_pic: {
      type: String,
      default:
        "https://res.cloudinary.com/dhgfid3ej/image/upload/v1558806705/asdsadsa_iysw1l.jpg",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },

    
    password: {
      type: String,
      /* required: true, */
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
