import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,       
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,  
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
     role: {
    type:String,
    enum:["user", "admin"],
    default:"user",
  },
  },
 

  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
