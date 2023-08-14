import sinon from 'sinon';
import app  from '../../../src/app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productsMock from '../../mocks/productsMock';
import ProductModel from '../../../src/database/models/product.model';

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
  it('correct body should return 201', async function () {
    const hostInstance = ProductModel.build(productsMock.validBody);
    sinon.stub(ProductModel, 'create').resolves(hostInstance);
    const httpResponse = await chai.request(app).post('/products').send(productsMock.validBody);
    expect(httpResponse.status).to.equal(201);
  })
});
