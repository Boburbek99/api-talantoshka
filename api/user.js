import express from "express";
let router = express.Router();

import jwt from "jsonwebtoken";
import { hashPassword } from "../services/passwordHash.js";
import { comparePasswords } from "../services/passwordHash.js";

import {
  requireAuth,
  jwtOptions,
  authRole,
} from "../services/passport-config.js";

import { userQueries } from "../model/user.js";
import { configDotenv } from "dotenv";

router.post("/register", async (req, res) => {
  try {
    let passwordHash = await hashPassword(req.body.password);
    let userData = { ...req.body };
    delete userData.password;
    userData.passwordHash = passwordHash;
    userData.role = "client";

    let userFound = await userQueries.addUser(userData);
    res.send(userFound);
  } catch (error) {
    res.status(500).send("Server error" + error);
  }
});

router.put("/password/:id", async (req, res) => {
  try {
    let passwordHash = await hashPassword(req.body.password);
    let userIdToUpdate = req.params.id
    const update = await userQueries.updatePassword(userIdToUpdate, passwordHash, req.body.login)
    res.status(200).send(update);
  } catch (error) {
    console.log(error, 'error')
    res.status(500).send("server error" + error)
  }
})

router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const findUser = await userQueries.UserByLogin(login);

    if (!findUser) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }
    let passwordsAreEqueal = await comparePasswords(
      password,
      findUser.passwordHash
    );
    if (!passwordsAreEqueal)
      return res
        .status(401)
        .json({ message: "Authentication failed. Wrong password." });

    const token = jwt.sign({ id: findUser._id }, jwtOptions.secretOrKey);
    delete findUser.passwordHash;
    return res.json({ token: token, user: findUser });
  } catch (error) {
    console.log(error, "error");

    res.status(500).send("Server error" + error);
  }
});

router.get("/userData", requireAuth, async (req, res) => {
  try {
    let currentUser = await userQueries.getUserById(req.user._id);
    res.send(currentUser);
  } catch (error) {
    res.status(500).send("Server error" + error);
  }
})

router.get("/admin", requireAuth, authRole(["admin", "author"]), async (req, res) => {
  try {
    let currentUser = await userQueries.getUserById(req.user._id);
    const userRole = currentUser.role;

    if (userRole === "admin" || userRole === "author") {
      res.send(userRole);
    } else {
      res.status(403).send("You do not have permission to access!!");
    }
  } catch (error) {
    res.status(500).send("Server error" + error);
  }
}
);

export default router;
