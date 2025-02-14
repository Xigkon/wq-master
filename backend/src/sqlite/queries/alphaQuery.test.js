import { expect } from "chai";
import { initDB } from "../index.js";
import { insertAlpha, updateAlphaFields, getAllAlpha } from "./alphaQuery.js";

describe("insertAlpha function", () => {
  let db;

  beforeEach(async () => {
    db = await initDB();
  });

  afterEach(() => {
    db.close();
  });

  it("should insert a new alpha record into the database", done => {
    const username = "testuser";
    const params = { key: "value" };
    const status = "active";
    const fields = { field1: "data1", field2: "data2" };

    insertAlpha(db, username, params, status, fields)
      .then(message => {
        // 验证记录是否成功插入
        db.get(
          "SELECT * FROM alpha WHERE username = ?",
          [username],
          (err, row) => {
            if (err) {
              return done(err);
            }
            expect(row).to.not.be.null;
            expect(row.username).to.equal(username);
            expect(row.params).to.equal(JSON.stringify(params));
            expect(row.status).to.equal(status);
            expect(row.fields).to.equal(JSON.stringify(fields));
            done();
          }
        );
      })
      .catch(done);
  });
});

describe("updateAlphaFields function", () => {
  let db;

  before(async () => {
    db = await initDB();
  });

  after(() => {
    db.close();
  });

  it("should update fields for an existing alpha record", done => {
    const params = { key: "value" };
    const status = "active";
    const oldFields = { field1: "oldData1", field2: "oldData2" };
    const newFields = { field1: "newData1", field2: "newData2" };

    insertAlpha(db, "testuser", params, status, oldFields)
      .then(id => updateAlphaFields(db, id, newFields))
      .then(id => {
        db.get("SELECT * FROM alpha WHERE id = ?", [id], (err, row) => {
          if (err) return done(err);
          expect(row).to.not.be.null;
          expect(row.fields).to.equal(JSON.stringify(newFields));
          done();
        });
      });
  });
});

describe("getAllAlpha function", () => {
  let db;

  beforeEach(async () => {
    db = await initDB(":memory:");
    await insertAlpha(db, "testuser1", { key: "value1" }, "active", {
      field1: "data1"
    });
    await insertAlpha(db, "testuser2", { key: "value2" }, "inactive", {
      field1: "data2"
    });
  });

  afterEach(() => {
    db.close();
  });

  it("should return all alpha records", async () => {
    const result = await getAllAlpha(db);

    expect(result).to.be.an("array").that.is.not.empty;
    expect(result).to.have.lengthOf(2);

    expect(result[0]).to.have.property("id");
    expect(result[0]).to.have.property("params");
    expect(result[0]).to.have.property("status");
    expect(result[0]).to.have.property("fields");
  });

  it("should return an empty array when no alpha records exist", async () => {
    await db.run("DELETE FROM alpha");
    const result = await getAllAlpha(db);
    expect(result).to.be.an("array").that.is.empty;
  });
});
