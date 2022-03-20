import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connectDB from "../../db/connectDB";
import User from "../../model/UserModel";

connectDB();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    if (req.method == "POST") {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(422).json({ error: "No such user exists" });
      }

      const doMatch = await bcrypt.compare(password, user.password);

      if (!doMatch) {
        return res.status(404).json({ message: "Password incorrect" });
      }

      // console.log(user, "   user");

      // const { email, _id } = user;

      const token = jwt.sign(
        { _id: user._id, email: email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // console.log(email, "   email");

      return res.status(200).json({
        User: { email: user.email, _id: user._id },
        token: token,
        message: "login successful",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
