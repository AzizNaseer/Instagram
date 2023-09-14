const user = require("../Models/User");
const argon2 = require("argon2");

async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const CheckUserExist = await user.findOne({ email });

    if (CheckUserExist) {
      return res
        .status(400)
        .json({ Message: "Username with this email already exists" });
    }

    const hashPass = await argon2.hash(password);

    const NewUser = new user({
      name,
      email,
      password: hashPass,
    });

    await NewUser.save();

    return res.status(201).json(name);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      const User = await user.findOne({ email });
  
      if (!User) {
        return res.status(401).json({ message: "Invalid Email" });
      }

      const name = User.name;
  
      const passwordMatch = await argon2.verify(User.password, password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid Password" });
      }
  
      res.status(200).json(name);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }


  
module.exports = {
  signup,
  login,
};
