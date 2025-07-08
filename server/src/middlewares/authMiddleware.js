import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //   console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(404)
      .json({ message: "Unauthorized: No token provided !!" });
  }

  const token = authHeader.split(" ")[1];
  //   console.log("from the middleware", token);
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("from the auth middleware decoded data", decode);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
