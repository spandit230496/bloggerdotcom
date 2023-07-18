const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find({});
    return res.status(200).send({
      userCount: user.length,
      success: true,
      message: "all users",
      user,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Error in fetching data from  backend",
    });
  }
};
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "please fill all fields",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "user already registered",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new userModel({ username, email, password: hashedpassword });
    user.save();
    return res.status(201).send({
      success: true,
      message: "user registered successfully",
    });
  } catch (e) {
    console.log(req.body);
    console.log(e);
    return res.status(500).send({
      message: "Error in register",
      success: false,
      error: e,
    });
  }
};
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "please enter username or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "user not found in database",
      });
    }
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).send({
        success: false,
        message: " invalid password or username ",
      });
    }
    return res.status(200).send({
      success: true,
      message: "log in successful",
      user,
    });
  } catch (e) {
    console.log(e);
    return res.send({
      success: false,
      message: "error in backend process",
    });
  }
};
