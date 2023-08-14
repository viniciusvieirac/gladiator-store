import sinon from 'sinon';
import app  from '../../../src/app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productsMock from '../../mocks/productsMock';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('no name body should return 400', async function () {
   
    const httpResponse = await chai.request(app).post('/products').send(productsMock.noNameBody);
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({
      "message": "name is required"
    });
  })
  it('no price body should return 400', async function () {
   
    const httpResponse = await chai.request(app).post('/products').send(productsMock.noPriceBody);
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({
      "message": "price is required"
    });
  })
  it('no orderId body should return 400', async function () {
   
    const httpResponse = await chai.request(app).post('/products').send(productsMock.noOrderBody);
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({
      "message": "orderId is required"
    });
  })
});
