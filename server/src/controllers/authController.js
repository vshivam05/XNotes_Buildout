import { loginService, RegisterService } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await RegisterService({ name, email, password });

    return res.status(201).json(result);
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res
        .status(400)
        .json({ error: "email and password are requried !!" });
    }

    const result = await loginService(req.body);

    // console.log("user login successfully", result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({
      error: error.message || "Authentication failed",
    });
  }
};
