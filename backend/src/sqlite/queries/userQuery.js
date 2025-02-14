function insertUser(db, username, password, token = null) {
  const insertSQL = `
    INSERT INTO users (username, password, token)
    VALUES (?, ?, ?)
    ON CONFLICT(username) 
    DO UPDATE SET password = excluded.password, token = excluded.token
  `;

  return new Promise((resolve, reject) => {
    db.run(insertSQL, [username, password, token], function(err) {
      if (err) {
        reject(new Error(`Insert user error: ${err.message}`));
      } else {
        resolve(`User ${username} inserted successfully`);
      }
    });
  });
}

// 更新用户的 token
function updateUserToken(db, username, newToken) {
  const updateSQL = `
    UPDATE users
    SET token = ?
    WHERE username = ?
  `;

  return new Promise((resolve, reject) => {
    db.run(updateSQL, [newToken, username], function(err) {
      if (err) {
        reject(new Error(`Update token error: ${err.message}`));
      } else if (this.changes === 0) {
        reject(new Error(`User ${username} not found`));
      } else {
        resolve(`Token for user ${username} updated successfully`);
      }
    });
  });
}

export { insertUser, updateUserToken };
