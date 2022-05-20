const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyT2IiOnsidXNlcm5hbWUiOiJ0dWxhc2ltYWRodSIsInBhc3N3b3JkIjoidHVsYXNpMTIzIn0sImlhdCI6MTY1MzAyNjMyMSwiZXhwIjoxNjUzMDI3NTIxfQ.JVrYLaBBtSoLSsCPsqBSunx6WSrGm4Uga8DkkBV4V0c';
describe('GET /category', () => {
  describe('GET /category', () => {
    it('OK get category', (done) => {
      request(app)
        .get(`/category`, {})
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
    it('OK post category', (done) => {
      const bookObj = {
        category_name: 'RomCom',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      request(app)
        .post(`/category`, {})
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
    it('OK edited category', (done) => {
      const bookObj = {
        category_name: 'Romance',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      request(app)
        .put(`/category/2`, {})
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
    it('OK deleted category', (done) => {
      request(app)
        .delete(`/category/3`, {})
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
