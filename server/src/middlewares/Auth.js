import jwt from "jsonwebtoken";
import { UserModel } from "../../database/models/user.model.js";
export const Auth = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res.status(403).json({ message: "please sign up" });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!decodedToken || !decodedToken._id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const isUserExist = await UserModel.findById(decodedToken._id);
    if (!isUserExist) {
      return res.status(404).json({ message: "Invalid login credentials" });
    }
    req.user = decodedToken;
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

  next();
};
