import express from "express";
let router = express.Router();

import jwt from "jsonwebtoken";
import { hashPassword} from "../services/passwordHash.js";
import { comparePasswords } from "../services/passwordHash.js";

import {requireAuth, jwtOptions  } from "../services/passport-config.js";
import { userQueries } from "../model/user.js";

router.post("/registration",async (req, res) => {
  try {
    let passwordHash = await hashPassword(req.body.password);
    let userData = {...req.body}
    delete userData.password;
    userData.passwordHash = passwordHash;

    let userFound = await userQueries.addUser(userData);
    res.send(userFound);
  } catch (error) {
    console.log(error,'error')
    res.status(500).send("Server error" + error);
  }
});

router.post("/login",async (req, res) => {
  try {
    const { login, password} = req.body;
    const findUser =  await userQueries.getUserByLogin(login);

    if (!findUser) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }
    let passwordsAreEqueal = await comparePasswords(password, findUser.passwordHash)
    if(!passwordsAreEqueal)
      return res.status(401).json({ message: 'Authentication failed. Wrong password.' });

      const token = jwt.sign({ id:findUser._id },jwtOptions.secretOrKey);
      delete findUser.passwordHash;
      return res.json({ token:token ,user:findUser });
  }
   catch (error) {
    console.log(error,'error')

    res.status(500).send("Server error" + error);
  }
});

export default router;