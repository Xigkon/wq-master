// 创建 alpha 表
function createAlphaModel(db) {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS alpha (
      id TEXT PRIMARY KEY,
      params TEXT,
      status TEXT,
      total INTEGER,
      finish INTEGER,
      success INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      username TEXT,
      fields TEXT
    );
  `;

  return new Promise((resolve, reject) => {
    db.run(createTableSQL, err => {
      if (err) {
        reject(new Error(`create alpha table error: ${err.message}`));
      } else {
        resolve("Alpha table created or already exists");
      }
    });
  });
}

export { createAlphaModel };
