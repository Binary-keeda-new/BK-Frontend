import descopeClient from "../../config/descope.js";
import User from "../../modules/user/user.model.js";
import { ROLES } from "../utils/constants.js";

export const verifyDescope = async (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid auth format",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing",
      });
    }

    const session = await descopeClient.validateSession(token);

    if (!session || !session.token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid session",
      });
    }

    const { sub, email } = session.token;

    if (!sub || !email) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token payload",
      });
    }

    let user = await User.findOne({ descopeId: sub });

    if (!user) {
      user = await User.create({
        descopeId: sub,
        email,
        role: ROLES.USER,
      });
    } else {
      let shouldSave = false;

      if (!user.role) {
        user.role = ROLES.USER;
        shouldSave = true;
      }

      if (user.email !== email) {
        user.email = email;
        shouldSave = true;
      }

      if (shouldSave) {
        await user.save();
      }
    }

    req.user = {
      id: user._id,
      sub: user.descopeId, // kept for backward compatibility
      descopeId: user.descopeId,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Descope verification error:", err);
    }

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};