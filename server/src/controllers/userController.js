import { fetchUserService } from "../services/fetchUserService.js";

const fetchUser = async (req, res) => {
  console.log("from the user controller", req.query.email);
  try {
    const { email } = req.query;
    const result = await fetchUserService(email);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Fetch user error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default fetchUser;
