import { Request, Response } from 'express';
import productsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function create(req: Request, res: Response): Promise<Response> {
  const { name, price, orderId } = req.body;
  const product = await productsService.create({ name, price, orderId });
  if (product.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(product.status)).json(product.data);
  }
  return res.status(201).json(product.data);
}

export default {
  create,
};