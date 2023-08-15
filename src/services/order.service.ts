import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';

async function getAll(): Promise<unknown[]> {
  const allOrders = await OrderModel.findAll({
    include: [
      {
        model: ProductModel,
        as: 'productIds',
        attributes: ['id'],
      },
    ],
  });

  const ordersWithProductIds = allOrders.map((order) => ({
    id: order.dataValues.id,
    userId: order.dataValues.userId,
    productIds: order.dataValues.productIds?.map((product) => product.id) || [],
  }));

  return ordersWithProductIds;
}

export default {
  getAll,
};