import sqlite3 from "sqlite3";

// 创建用户表
function createUserModel(db) {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY NOT NULL,
      password TEXT NOT NULL,
      token TEXT
    );
  `;

  return new Promise((resolve, reject) => {
    db.run(createTableSQL, err => {
      if (err) {
        reject(new Error(`create user model error: ${err.message}`));
      } else {
        resolve("Table created or already exists");
      }
    });
  });
}

export { createUserModel };
