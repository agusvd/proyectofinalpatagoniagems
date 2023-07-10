import request from 'supertest';
import app from '../src/app.js';

import { expect } from 'chai';

describe('POST /register', () => {
    it('debería registrar un usuario correctamente', (done) => {
        request(app)
            .post('/register')
            .send({
                nombre: 'juanito',
                apellido: 'estrella',
                email: 'juanitoestrella@gmail.com',
                contraseña: 'holapa123123',
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('Status');
                expect(res.body.Status).to.equal('Perfecto');
                done();
            });
    });

    it('debería devolver un error si falta algún campo en el registro', (done) => {
        request(app)
            .post('/register')
            .send({
                nombre: 'sebastian',
                apellido: 'godoy',
                email: 'sebapa123@gmail.com',
                // El campo 'contraseña' falta intencionalmente
            })
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('Error');
                done();
            });
    })
})