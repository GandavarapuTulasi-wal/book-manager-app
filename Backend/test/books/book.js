const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyT2IiOnsidXNlcm5hbWUiOiJ0dWxhc2ltYWRodSIsInBhc3N3b3JkIjoidHVsYXNpMTIzIn0sImlhdCI6MTY1MzAyNjMyMSwiZXhwIjoxNjUzMDI3NTIxfQ.JVrYLaBBtSoLSsCPsqBSunx6WSrGm4Uga8DkkBV4V0c';
describe('GET /books', () => {
  describe('GET /books', () => {
    it('OK get books', (done) => {
      request(app)
        .get(`/books`, {})
        .then((res) => {
          const body = res.body;
          console.log(res.body);
          expect(res.statusCode).to.equal(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    it('OK post book', (done) => {
      const bookObj = {
        title: 'filename',
        author: 'abdul kalam',
        subject: 'inspirational book',
        price: '200',
        category_id: 3,
        availability: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      request(app)
        .post(`/books`, {})
        .send(bookObj)
        .set({ token })
        .then((res) => {
          const body = res.body;
          console.log(res.body);
          expect(res.statusCode).to.equal(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    it('OK edited book', (done) => {
      const bookObj = {
        title: 'wings of fire',
        author: 'abdul kalam',
        subject: 'inspirational book',
        price: '200',
        category_id: 1,
        availability: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        image: 'uploads/1652963784563-download.jpeg',
      };
      request(app)
        .put(`/books/40`, {})
        .send(bookObj)
        .set({ token })
        .then((res) => {
          const body = res.body;
          console.log(res.body);
          expect(res.statusCode).to.equal(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    it('OK deleted book', (done) => {
      request(app)
        .delete(`/books/40`, {})
        .set({ token })
        .then((res) => {
          const body = res.body;
          console.log(res.body);
          expect(res.statusCode).to.equal(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
