import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("Authorization header:", req.headers.authorization);
  
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json("Error: Authorization header missing.");
  }

  const [prefix, token] = auth.split(" ");

  if (prefix !== "Bearer" || !token) {
    return res
      .status(401)
      .json("Error: Missing or invalid Authorization Bearer token.");
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_ENV);
    
    next();
  } catch (error) {
    return res.status(401).json("Token is invalid or expired");
  }
};

