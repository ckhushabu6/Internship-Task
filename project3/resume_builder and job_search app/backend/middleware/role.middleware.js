const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try{
             if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access denied: insufficient permissions'
      });
    }
    next();
    }catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Role authorization failed'
      });
    }
   
  };
};

module.exports = authorizeRoles;