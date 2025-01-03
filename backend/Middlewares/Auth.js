const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authentication token missing or invalid" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach user details to req object
    req.user = { id: decoded.id };
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(403).json({ message: "Failed to authenticate token" });
  }
};

module.exports = authenticateUser;
