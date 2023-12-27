import bcrypt from "bcrypt";
import { promisify } from "util";

const genSaltAsync = promisify(bcrypt.genSalt);
const hashAsync = promisify(bcrypt.hash);
const compareAsync = promisify(bcrypt.compare);

export async function hashPassword(password) {
  try {
    const salt = await genSaltAsync(10);

    const hashedPassword = await hashAsync(password, salt);

    return hashedPassword;
  } catch (error) {
    console.log(error,'ERROR');
    throw error;
  }
}

export async function comparePasswords(passwordToCheck, storedHashedPassword) {
  try {
    const isMatch = await compareAsync(passwordToCheck, storedHashedPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

