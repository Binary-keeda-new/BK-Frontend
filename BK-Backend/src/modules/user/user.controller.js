import User from "./user.model.js";

/**
 * @desc Sync user from auth provider (Descope)
 * @route POST /api/user/sync
 * @access Private
 */
export const syncUser = async (req, res, next) => {
  try {
    const descopeId = req.user?.sub;
    const email = req.user?.email;

    if (!descopeId || !email) {
      return res.status(400).json({
        message: "Invalid token payload",
      });
    }

    // Atomic operation (prevents duplicates)
    const user = await User.findOneAndUpdate(
      { descopeId },
      { email },
      {
        upsert: true,
        returnDocument: "after" ,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      message: "User synced successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Get current logged-in user
 * @route GET /api/user/me
 * @access Private
 */
export const getMe = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: {
        id: req.user.id,
        descopeId: req.user.descopeId,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};