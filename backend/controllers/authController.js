const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const newUserSchema = zod.object({
  username: zod
    .string({
      required_error: "User name is required.",
      invalid_type_error: "User name must be a string.",
    })
    .min(3, { message: "User name must be 3 or more characters long." })
    .max(30, { message: "User name must be 30 or fewer characters long." })
    .email(),
  password: zod
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Password must be a string.",
    })
    .min(6, {
      message: "Password must be 3 or more characters long.",
    }),
  firstName: zod.string({
    required_error: "First name is required.",
    invalid_type_error: "First name must be string.",
  }),
  lastName: zod.string({
    required_error: "Last name is required.",
    invalid_type_error: "Last name must be a string.",
  }),
});

const signUpController = async (req, res) => {
  try {
    const userDetails = req.body;
    const isValidUser = newUserSchema.safeParse(userDetails);
    if (!isValidUser.success) {
      res.status(411).json({
        message: "Incorrect inputs.",
      });
      return;
    }
    const existingUser = await User.findOne({
      username: userDetails.username,
    });
    if (existingUser) {
      res.status(411).json({
        message: "Email already taken.",
      });
      return;
    }
    const createdUser = await User.create(userDetails);
    const token = await jwt.sign(
      { username: createdUser.username },
      JWT_SECRET
    );

    res.status(200).json({
      message: "Account created successfully",
      token: token,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = {
  signUpController,
};
