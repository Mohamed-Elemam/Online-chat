import { config } from "dotenv";
config();
import { UserModel } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "email already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      online: true,
    });

    await newUser.save();

    const token = jwt.sign(
      { _id: newUser._id, username, email },
      process.env.TOKEN_SECRET
    );

    return res
      .status(201)
      .json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const unHashedPassword = bcrypt.compareSync(password, user.password);

    if (!unHashedPassword) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    user.online = true;
    const token = jwt.sign(
      { _id: user._id, username: user.username, email },
      process.env.TOKEN_SECRET
    );
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    // const userId = req.user._id;
    const { userId } = req.params;
    const user = await UserModel.findByIdAndUpdate(userId, { online: false });

    res.status(200).json({ message: "Done", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get online users
export const onlineUsers = async (req, res, next) => {
  try {
    console.log(req.user);
    const userId = req.user._id;
    const users = await UserModel.find({
      _id: { $ne: userId },
      online: true,
    });
    if (!users) {
      return res.status(404).json({ error: "No users currently online" });
    }
    res.status(200).json({ message: "Done", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//*if user exits
// In your Socket.io server code
// io.on('connection', (socket) => {
// Handle user connection...

//   socket.on('disconnect', () => {
// Update user status on disconnect
//     const userId = /* get userId from the socket or session */;
//     userController.updateOnlineStatus(userId, false);
//   });
// });
