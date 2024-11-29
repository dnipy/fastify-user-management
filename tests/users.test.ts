import fastify, { FastifyInstance } from 'fastify';
import {BaseRouter} from "../src/index"
import { cleanupTestDatabase } from '../src/plugins';


describe('GET /api/v1/user', () => {
    let app: FastifyInstance;

    beforeAll(async () => {
        app = fastify();
        app.register(BaseRouter);
        await app.ready();
    });

    afterAll(async() => {
        await cleanupTestDatabase();
        app.close()
    });

    it('should return a list of users and count', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/v1/user?skip=0&take=10',
        });

        const payload = JSON.parse(response.payload);

        expect(response.statusCode).toBe(200);
        expect(payload.success).toBe(true);
        expect(Array.isArray(payload.data)).toBe(true);
        expect(typeof payload.count).toBe('number');
    });

    it('should handle invalid query parameters gracefully', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/v1/user?skip=invalid&take=invalid',
        });

        
        expect(response.statusCode).toBe(400);
    });
});

describe('POST /api/v1/user/add', () => {
    let app: FastifyInstance;

    beforeAll(async () => {
        app = fastify();
        app.register(BaseRouter);
        await app.ready();
    });

    afterAll(() => app.close());

    it('should add a new user with valid data', async () => {
        const userData = {
            phone: '09153456789', 
            username: 'john_doe5',
            email: 'john5.doe@example.com',
            age: 10,
        };

        const response = await app.inject({
            method: 'POST',
            url: '/api/v1/user/add',
            payload: userData,
        });

        const payload = JSON.parse(response.payload);

        expect(response.statusCode).toBe(201)
        expect(payload.user).toHaveProperty('phone', userData.phone);
    });

    it('should return an error if user already exists', async () => {
        const userData = {
            phone: '09123456789',
        };

        const response = await app.inject({
            method: 'POST',
            url: '/api/v1/user/add',
            payload: userData,
        });

        const payload = JSON.parse(response.payload);

        expect(response.statusCode).toBe(422);
        expect(payload.msg).toBe('user exists');
    });

    it('should return an error if the phone is invalid', async () => {
        const userData = {
            phone: 'invalidPhone',
        };

        const response = await app.inject({
            method: 'POST',
            url: '/api/v1/user/add',
            payload: userData,
        });

        
        expect(response.statusCode).toBe(400);
    });
});
