const request = require("supertest");

const app = require("../src/app");

describe("GET/users", () => {
    it('respond with json containing a list of all users', (done) => {
        request(app)
            .get("/users")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });

});

describe("GET/users/:id", () => {
    it('respond with json containing a single user', (done) => {
        request(app)
            .get("/users/U0001")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });

    it('respond wtih json "user U00001 Found" when the user exists', done => {
        request(app)
            .get("/users/U0001")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect('"user U00001 Found"')
            .end((err) => {
                if (err) return done(err);
                done();
            });

    });

    it('respond with json "user not found" when the user does not exists', (done) => {
        request(app)
            .get("/users/nonexistinguser")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404)
            .expect('"user not found"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe("POST/users", () => {
    it('responde with 201 created', done => {
        const data = {
            username: 'demi',
            password: 'leopoldo'
        }
        request(app)
            .post('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(err => {
                if (err) return (err);
                done();
            })
    });
    it('respond with code 400 on bad request', done => {
        const data = {}
        request(app)
            .post('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"user nor created"')
            .end(err => {
                if (err) return (err);
                done();
            })
    });

});