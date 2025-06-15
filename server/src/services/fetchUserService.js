import Auth from "../models/authSchema.js"; 

export const fetchUserService = async (email) => {
  try {
    const user = await Auth.findOne({email}).select("-password"); // ✅ optionally hide password
    return user;
  } catch (error) {
    throw new Error("Database error while fetching user");
  }
};
