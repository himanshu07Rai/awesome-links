import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connectDB from "../../db/connectDB";
import User from "../../model/UserModel";

connectDB();

export default async (req, res) => {
  try {
    if (req.method == "POST") {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(422).json({ error: "User already exists" });
      }
      const HashedPassword = await bcrypt.hash(password, 12);
      const newUser = await new User({
        email: email,
        password: HashedPassword,
      }).save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error.message);
  }
};
