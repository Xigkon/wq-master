import { v4 as uuidv4 } from "uuid";

function insertAlpha(db, username, params, status, fields) {
  const insertSQL = `
    INSERT INTO alpha (id, params, status, fields, username)
    VALUES (?, ?, ?, ?, ?)
  `;

  const id = uuidv4();

  return new Promise((resolve, reject) => {
    db.run(
      insertSQL,
      [id, JSON.stringify(params), status, JSON.stringify(fields), username],
      function(err) {
        if (err) {
          reject(new Error(`Insert alpha error: ${err.message}`));
        } else {
          resolve(id);
        }
      }
    );
  });
}

function updateAlphaFields(db, id, fields) {
  const updateSQL = `
    UPDATE alpha
    SET fields = ?
    WHERE id = ?
  `;

  return new Promise((resolve, reject) => {
    db.run(updateSQL, [JSON.stringify(fields), id], function(err) {
      if (err) {
        reject(new Error(`Update alpha fields error: ${err.message}`));
      } else {
        if (this.changes === 0) {
          reject(new Error(`No record found with ID ${id}`));
        } else {
          resolve(id);
        }
      }
    });
  });
}

function getAllAlpha(db) {
  const selectSQL = `
    SELECT * FROM alpha
  `;

  return new Promise((resolve, reject) => {
    db.all(selectSQL, (err, rows) => {
      if (err) {
        reject(new Error(`Get all alpha records error: ${err.message}`));
      } else {
        resolve(rows);
      }
    });
  });
}

export { insertAlpha, updateAlphaFields, getAllAlpha };
