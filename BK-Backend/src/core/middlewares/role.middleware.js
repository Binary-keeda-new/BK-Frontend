const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: user not found in request',
        })
      }

      if (req.user.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: insufficient permissions',
        })
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

export default roleMiddleware