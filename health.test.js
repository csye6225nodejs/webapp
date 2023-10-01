const app  = require('./app');
const supertest = require('supertest');
const request = supertest(app);


describe('/healthz', () => {
    it('should return a 200 status code', async () => {
        const response = await request.get('/healthz');
        expect(response.status).toBe(200);
    });
});
