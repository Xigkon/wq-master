import { expect } from "chai";
import { initDB } from "../index.js";
import { insertUser, updateUserToken } from "./userQuery.js";

// Test case for insertUser function
describe("insertUser function", () => {
  let db;

  before(async () => {
    // Create a new in-memory database and set up the user model
    db = await initDB();
  });

  after(() => {
    db.close();
  });

  it("should insert a new user into the database", done => {
    const username = "testuser";
    const password = "password123";
    const token = "token123";

    insertUser(db, username, password, token)
      .then(message => {
        expect(message).to.equal(`User ${username} inserted successfully`);

        // Verify the user is inserted correctly
        db.get(
          "SELECT * FROM users WHERE username = ?",
          [username],
          (err, row) => {
            if (err) {
              return done(err);
            }
            expect(row).to.not.be.null;
            expect(row.username).to.equal(username);
            expect(row.password).to.equal(password);
            expect(row.token).to.equal(token);
            done();
          }
        );
      })
      .catch(done);
  });

  it("should replace an existing user with the same username", done => {
    const username = "testuser";
    const newPassword = "newpassword";
    const newToken = "newtoken";

    // Insert the user for the first time
    insertUser(db, username, "oldpassword", "oldtoken")
      .then(() => {
        // Now replace the user with new data
        return insertUser(db, username, newPassword, newToken);
      })
      .then(message => {
        expect(message).to.equal(`User ${username} inserted successfully`);

        // Verify the user is updated
        db.get(
          "SELECT * FROM users WHERE username = ?",
          [username],
          (err, row) => {
            if (err) {
              return done(err);
            }
            expect(row).to.not.be.null;
            expect(row.username).to.equal(username);
            expect(row.password).to.equal(newPassword);
            expect(row.token).to.equal(newToken);
            done();
          }
        );
      })
      .catch(done);
  });
});
