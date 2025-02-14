import { expect } from "chai";
import { initDB } from "./index.js";
import sqlite3 from "sqlite3"


describe("Database Tests", () => {
  it("should create a database connection", done => {
    const dbPath = ":memory:";

    initDB(dbPath)
      .then(db => {
        expect(db).to.be.an.instanceof(sqlite3.Database);
        done();
      })
      .catch(err => done(err));
  });
});
