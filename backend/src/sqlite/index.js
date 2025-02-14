import sqlite3 from "sqlite3";
import { createUserModel } from "./models/userModel.js";

async function createDatabase(path) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(path, err => {
      if (err) {
        reject(new Error(`连接失败: ${err.message}`));
      } else {
        resolve(db);
      }
    });
  });
}

async function initDB(DATABASE_PATH = ":memory:") {
  const db = await createDatabase(DATABASE_PATH);
  await createUserModel(db).then(message => console.log(message))
  //   await createAlpha(db).then(message => console.log(message));
  //   await createField(db).then(message => console.log(message));
  return db;
}

export { initDB };
