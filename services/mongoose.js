import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbOptions = {
  dbName: process.env.DB_NAME,
};
const dbURL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`;

export async function mongoConnect() {
  try {
    await mongoose.connect(dbURL, dbOptions);
    console.log("Подключилcя к MongoDB");
  } catch (error) {
    console.error("Проблема с подключением к MongoDB", error);
  }
}

export async function disConnect() {
  try {
    await mongoose.connection.close();
    console.log("отключился с mongoDB");
  } catch (err) {
    console.log("ошибка при закрытия соединения с базой данных", err);
  }
}
