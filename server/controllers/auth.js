import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      role: "USER",
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REGISTER ADMIN
// export const registerAdmin = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;
//     const salt = await bcrypt.genSalt();
//     const passwordHash = await bcrypt.hash(password, salt);
//     const pictureFile = req.files["picture"][0];

//     const newAdmin = new User({
//       firstName,
//       lastName,
//       email,
//       password: passwordHash,
//       picturePath: pictureFile ? pictureFile.filename : null,
//       role: "ADMIN",
//     });

//     const savedAdmin = await newAdmin.save();
//     res.status(201).json(savedAdmin);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// LOGIN
export const login = async (req, res) => {
  try {
    let user;
    const { email, password } = req.body;
    const isUser = await User.findOne({ email: email, role: "USER" });
    const isAdmin = await User.findOne({ email: email, role: "ADMIN" });

    if (isUser) {
      user = isUser;
    } else if (isAdmin) {
      user = isAdmin;
    } else {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
