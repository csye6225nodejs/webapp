const app  = require('./../app');
const supertest = require('supertest');
const request = supertest(app);
const logger = require('./../logger/logger');

describe('/healthz', () => {
    it('should return a 200 status code', async () => {
        logger.info("running api testing on /healthz");
        const response = await request.get('/healthz');
        expect(response.status).toBe(200);
    });
});
