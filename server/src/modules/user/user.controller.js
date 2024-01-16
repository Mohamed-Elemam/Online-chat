import { UserModel } from "../../../database/models/user.model.js";
import { io } from "./../../../server.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "email already exists" });
    }

    const newUser = new UserModel({
      username,
      email,
      password,
      online: true,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    user.online = true;
    res.json({ message: "Login successful", user });
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

    res.json({ message: "Logout successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//err handle
// auth
// hash

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
