const expect = require("expect");
const request = require("supertest");
const { app } = require("../app");
const User = require("../models/User");

describe("POST /auth/register", () => {
  let username = "kanban";
  let email = "test@kanban.com";
  let password = "1234567";
  it("should create a user", (done) => {
    request(app)
      .post("/auth/register")
      .send({ username, email, password })
      .expect((res) => {
        expect(res.headers["set-cookie"]).not.toBeNull();
        expect(res.body.success.user._id).not.toBeNull();
        expect(res.body.success.user.email).toBe(email);
      })
      .end((err) => {
        if (err) return done(err);
        User.findOne({ email })
          .then((user) => {
            console.log(user._doc);
            expect(user).not.toBeNull();
            expect(user.email).toBe(email);
            done();
          })
          .catch((err) => {
            return done(err);
          });
      });
  });

  it("should not create user if email in use", (done) => {
    request(app)
      .post("/auth/register")
      .send({
        username: "eric",
        email: email,
        password: "232423w",
      })
      .expect(400)
      .end(done);
  });

  it("should not create user if username exist", (done) => {
    request(app)
      .post("/auth/register")
      .send({
        username: username,
        email: "test@test.com",
        password: "20304jwel;",
      })
      .expect(400)
      .end(done);
  });

  it("should return validation erros if request is invalid", (done) => {
    request(app)
      .post("/auth/register")
      .send({
        username: "kanban",
        email: "ajfodjadfj",
        password: "oreow2",
      })
      .expect(400)
      .end(done);
  });

  after((done) => {
    User.deleteMany({}).then(() => done());
  });
});

describe("POST /auth/login", () => {
  let loginUser;
  before((done) => {
    User.create({
      username: "kanban",
      email: "test@kanban.com",
      password: "123456",
    }).then((user) => {
      loginUser = user;
      return done();
    });
  });

  it("should login user and set auth cookies", (done) => {
    request(app)
      .post("/auth/login")
      .send({
        username: "kanban",
        email: "test@kanban.com",
        password: "123456",
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers["set-cookie"]).not.toBeNull();
      })
      .end((err, res) => {
        if (err) return done(err);

        User.findById(loginUser._id)
          .then((user) => {
            expect(user).toHaveProperty("register_date");
            expect(user._id).toStrictEqual(loginUser._id);
            done();
          })
          .catch((err) => done(err));
      });
  });

  it("should reject invalid login", (done) => {
    request(app)
      .post("/auth/login")
      .send({
        username: "kanban",
        email: "test@kanban.com",
        password: "324ljerjwl",
      })
      .expect(401)
      .expect((res) => {
        expect(res.headers["set-cookies"]).toBeUndefined();
      })
      .end((err, res) => {
        if (err) return done(err);

        User.findById(loginUser._id)
          .then((user) => {
            expect(user).toHaveProperty("register_date");
            done();
          })
          .catch((err) => done(err));
      });
  });

  after((done) => {
    User.deleteMany({}).then(() => done());
  });
});

describe("GET /auth/logout", () => {
  before((done) => {
    User.create({
      username: "kanban",
      email: "test@kanban.com",
      password: "123456",
    }).then(() => done());
  });

  it("should remove cookies and log user out", (done) => {
    request(app)
      .post("/auth/login")
      .send({
        username: "kanban",
        email: "test@kanban.com",
        password: "123456",
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers["set-cookies"]).not.toBeNull();
        request(app)
          .get("/auth/logout")
          .expect((res) => {
            expect(res.headers["set-cookies"]).toBeUndefined();
          });
      })
      .end(done);
  });

  after((done) => {
    User.deleteMany({}).then(() => done());
  });
});

describe("GET /auth/user", () => {
  before((done) => {
    User.create({
      username: "kanban",
      email: "test@kanban.com",
      password: "123456",
    }).then(() => done());
  });

  it("should return user if authenticated", (done) => {
    let userId;
    let username;
    const email = "test@kanban.com";
    request(app)
      .post("/auth/login")
      .send({
        username: "kanban",
        email: "test@kanban.com",
        password: "123456",
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers["set-cookies"]).not.toBeNull();
        expect(res.body.success.user.email).toBe(email);
        userId = res.body.success.user._id;
        username = res.body.success.user.username;
        request(app)
          .get("/auth/user")
          .expect(200)
          .expect((res) => {
            expect(res.body.success.user._id).toBe(userId);
            expect(res.body.success.user.username).toBe(username);
          });
      })
      .end(done);
  });

  it("should return 401 if not authenticated", (done) => {
    request(app)
      .get("/auth/user")
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });

  after((done) => {
      User.deleteMany({}).then(() => done());
      
  });
});


