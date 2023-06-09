import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register User
export const register = async (request, response) => {
  try {
    const { username, password } = request.body;

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return response.json({
        message: "Данное имя пользователя уже занято!",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    await newUser.save();

    response.json({
      newUser,
      token,
      message: "Регистрация прошла успешно!",
    });
  } catch (error) {
    response,
      json({
        message: "Ошибка при создании нового пользователя!",
      });
  }
};

// Login User
export const login = async (request, response) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });

    if (!user) {
      return (
        response,
        json({
          message: "Пользователь не найден!",
        })
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return (
        response,
        json({
          message: "Указан неправильный пароль!",
        })
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    response.json({
      token,
      user,
      message: "Вы успешно авторизированы!",
    });
  } catch (error) {
    response.json({
      message: "Указано неверное имя пользователя или пароль!",
    });
  }
};

// Get Me
export const getme = async (request, response) => {
  try {
    const user = await User.findById(request.userId);

    if (!user) {
      return (
        response,
        json({
          message: "Пользователь не найден!",
        })
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    response.json({
      user,
      token,
    });
  } catch (error) {
    response.json({
      message: "Нет доступа!",
    });
  }
};
