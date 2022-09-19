const supertest = require("supertest");
const {app} = require('../index');


describe("book testing", () => {
    it("PUT /api/books/update-book", async () => {
        const data = {
            "bookId": 5,
            "detailsToUpdate": {
                "rating": 5
            },
        };

        const res = await supertest(app).put('/api/books/update-book').send(data);

        expect(res.status).toBe(200);
        expect(res.body.rating).toBe(5)
        expect(res.body.pages).toBe(478);
    });

    it("POST /api/books/returnbook", async () => {
        const data = {
            "id": 3
        };

        const res = await supertest(app).post("/api/books/returnbook").send(data);

        expect(res.status).toBe(200);
        expect(res.body.year).toBe(1985);
    });

    it("POST /api/books/loanbook", async () => {
        const data = {
            "email": "User1@mail.com",
            "password": "User123",
            "title": "Chike and the river"
        }
        const res = await supertest(app).post('/api/books/loanbook').send(data);
        expect(res.status).toBe(200);
        expect(res.body.isbn).toBe("9812345678")
    });
});

describe("User testing", () => {

    it("GET /api/users/getuser routes", async () => {
        const res = await supertest(app).get('/api/users/getuser').send({
            "email": "User1@mail.com",
            "password": "User123"
        });
        expect(res.status).toBe(403)
    });

    it("POST /api/users/auth routes", async () => {
        const data = {
            "email": "User2@mail.com",
            "password": "password22"
        }

        const res = await supertest(app).post('/api/users/auth').send(data);
        expect(res.status).toBe(200)
        expect(res.body.phoneNumber).toBe("+233658975678")
    });

    it("POST /api/users/create routes", async () => {
        const data = {
            "name": "brain man",
            "email": "brainaic@mail.com",
            "password": "brain223",
            "phoneNumber": "0912346812",
            "address": "24, straight str."
        }
        const res = await supertest(app).post('/api/users/create').send(data);
        expect(res.status).toBe(200);
        expect(res.body.role).toBe("visitor");
        expect(res.body.email).toBe(data.email);
    });
});