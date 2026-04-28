const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // ✅ Check if user exists
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userRole = req.user.role || "user";

    // ✅ Check role
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "Access Denied"
      });
    }

    next();
  };
};

module.exports = roleMiddleware;