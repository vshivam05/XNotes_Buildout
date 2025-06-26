import Auth from "../models/authSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const tokenGenerate = (user) => {
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET
  );

  return token;
};

export const RegisterService = async (data) => {
  //   const newRegister = await new Auth(data);
  //   await newRegister.save();
  const { name, email, password } = data;

  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);
  console.log("from the authservice", data);

  // const existingUser = await Auth.findOne({ $or: [{ email }, { name }] });
  // if (existingUser) {
  //   return res
  //     .status(404)
  //     .json({ error: "User with this email or name already exists" });
  // }

  try {
    const newRegister = await Auth.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = tokenGenerate(newRegister);

    console.log(newRegister);

    const userToreturn = {
      name: newRegister.name,
      email: newRegister.email,
    };
    return {
      message: "User registered successfully",
      token: token,
      user: userToreturn,
    };
  } catch (e) {
    return e;
  }
};

export const loginService = async (data) => {
  const { email, password } = data;

  const user = await Auth.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid  email or password");
  }

  const token = tokenGenerate(user);

  const returnedUser = {
    name: user.name,
    email: user.email,
  };
  return {
    message: "Login successful",
    token: token,
    user: returnedUser,
  };
};
