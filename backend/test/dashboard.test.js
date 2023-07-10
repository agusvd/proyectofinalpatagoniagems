import db from '../src/db.js';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../src/app.js';

import { expect } from 'chai';
const secretKey = 'jwt-secret-key';

describe('Dashboard Routes', () => {
    let token;

    before(async () => {
        // Generar un token de prueba para las pruebas de autenticación
        const payload = {
            nombre: 'Agustin',
            apellido: 'Villarroel',
            role: 'admin',
            isAdmin: true,
            id: 1,
        };

        token = jwt.sign(payload, secretKey);
    });

    after((done) => {
        // Limpiar los datos de prueba después de que se ejecuten las pruebas
        const deleteQuery = 'DELETE FROM productos';
        db.query(deleteQuery, () => {
            done();
        });
    });

    describe('GET /dashboard', () => {
        it('debería devolver el estado "Perfecto" si el usuario está autenticado', (done) => {
            request(app)
                .get('/dashboard')
                .set('Cookie', `token=${token}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('Status', 'Perfecto');
                    done();
                });
        });

        it('debería redirigir a /404 si el usuario no está autenticado', (done) => {
            request(app)
                .get('/dashboard')
                .expect(302)
                .expect('Location', '/404')
                .end(done);
        });
    });

    describe('GET /dashboard/inventario', () => {
        it('debería devolver los productos del inventario', (done) => {
            request(app)
                .get('/dashboard/inventario')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('POST /dashboard/inventario/agregar', () => {
        it('debería agregar un nuevo producto al inventario', (done) => {
            const nuevoProducto = {
                nombre: 'Producto de prueba',
                descripcion: 'Este es un producto de prueba',
                precio: 25000,
                stock: 50,
                categoria_id: 1,
                es_destacado: 'si',
            };

            request(app)
                .post('/dashboard/inventario/agregar')
                .set('Cookie', `token=${token}`)
                .send(nuevoProducto)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('affectedRows', 1);
                    done();
                });
        });
    });
});
