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
      if (!user) {
        return res.status(422).json({ error: "No such user exists" });
      }

      const doMatch = await bcrypt.compare(password, user.password);

      if (!doMatch) {
        return res.status(404).json({ message: "Password incorrect" });
      }

      console.log(user);

      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      return res.status(200).json({ user: user, token: token });
    }
  } catch (error) {
    console.log(error.message);
  }
};
