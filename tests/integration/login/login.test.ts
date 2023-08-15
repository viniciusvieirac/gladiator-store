import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/loginMock';

chai.use(chaiHttp);

describe('POST /login', () => {
  beforeEach(() => { sinon.restore(); });

  it('ao não enviar um username, devolve um erro!', async () => {
    // Arrange - configuro as depencias do meu test

    // Act - ato de chamar a funcao a ser testada
    // app === http:localhost:3999/login
    const httpResponse = await chai.request(app).post('/login').send(loginMock.noUsernameLoginBody);

    // Assert - é onde verificamos o resultado esperado
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ "message": "\"username\" and \"password\" are required" });
  });

  it('ao não enviar uma senha, devolve um erro!', async () => {
    // Arrange

    // Act
    const httpResponse = await chai.request(app).post('/login').send(loginMock.noPasswordLoginBody);

    // Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ "message": "\"username\" and \"password\" are required" });
  });

  it('ao enviar um username inexistente, devolve um erro!', async () => {
    // Arrange
    sinon.stub(UserModel, 'findOne').resolves(null);

    // Act
    const httpResponse = await chai.request(app).post('/login').send(loginMock.notExistingUserBody);

    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ "message": "Username or password invalid" });
  });
});