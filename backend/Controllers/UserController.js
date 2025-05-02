import jwt from "jsonwebtoken";
import UserScheema from "../Models/UserScheema.js";
import { compirePassword, hashPassword } from "../utils/authUtils.js";
export const Register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    // validations

    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!username) {
      return res.send({ message: "User is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    // existing user

    const existingUser = await UserScheema.findOne({ email: email });

    if (existingUser) {
      return res.send({ message: "User Already Register... Please Login" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserScheema.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    res.status(200).send({
      success: true,
      message: "Account has been Created",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// user login

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({ message: "Email and Password is required" });
    }

    const user = await UserScheema.findOne({ email: email });
    if (!user) {
      return res.send({
        message: "Email is not register",
      });
    }
    const metch = await compirePassword(password, user.password);

    if (!metch) {
      return res.send({ message: "Email or Password invalid" });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT, {
      expiresIn: "1d",
    });

    res.status(200).send({
      success: true,
      message: "User LoggedIn",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
