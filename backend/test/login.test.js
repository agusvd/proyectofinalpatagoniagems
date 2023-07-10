import chai from 'chai';
import request from 'supertest';
import app from '../src/app.js';

const { expect } = chai;

describe('POST /login', () => {
    it('debería devolver un token de autenticación válido si las credenciales son correctas', (done) => {
        request(app)
            .post('/login')
            .send({ email: 'agus@gmail.com', contraseña: 'admin123123' })
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('isAdmin' || 'isUser');
                done();
            });
    });

    it('debería devolver un mensaje de error si las credenciales son incorrectas', (done) => {
        request(app)
            .post('/login')
            .send({ email: 'agus@gmail.com', contraseña: 'contraseñaincorrecta' })
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.property('Error');
                expect(res.body.Error).to.equal('Contraseña invalida');
                done();
            });
    });

    it('debería devolver un mensaje de error si el email no existe', (done) => {
        request(app)
            .post('/login')
            .send({ email: 'usuarioinexistente@example.com', contraseña: 'contraseña123' })
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.property('Error');
                expect(res.body.Error).to.equal('No existe este email');
                done();
            });
    });
});
