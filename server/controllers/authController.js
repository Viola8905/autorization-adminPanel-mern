const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config");
const asyncHandler = require("../middleware/asyncHandler");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }
      const { username, password, platform } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
        platform: platform,
      });
      await user.save();

      return res.json({ message: "User is registered" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token, user });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }

  async getUsers(req, res) {
    try {
      let query;

      const reqQuery = { ...req.query }; //spread into a new one query

      const removeFields = ["sort"]; //you can add here more fields(specified what fields to remove)

      removeFields.forEach((value) => delete reqQuery[value]); //(and remove fields from request query object)if you find in an object key that matches this value,delete the entiere key-value pair

      let queryStr = JSON.stringify(reqQuery); //turned request query object into a string
      console.log(queryStr);

      queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in|regex)\b/g,
        (match) => `$${match}`
      ); //gt-grater than ..../mongodb logical operators(manipulate string if it contain any of following instructions)
      console.log(queryStr);

      query = User.find(JSON.parse(queryStr));
      if (req.query.sort) {
        //sorting by price and rating
        const sortByArr = req.query.sort.split(",");

        const sortByStr = sortByArr.join("");

        query = query.sort(sortByStr);
      } else {
        query = query.sort("username");
      }

      //                 {"price":{"$lte":"900"}}
      const users = await query; //it will show bootcamps where price is less than 1000
      res.status(200).json(users);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUserById(req, res) {
    try {
      let user = await User.findOneAndDelete({ _id: req.params._id });

      if (!user) {
        return next(new ErrorResponse("user with this id was not found", 404));
      }

      res.status(200).json({
        success: true,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
