const validName = 'Martelo de Thor';
const validprice = '30 peças de ouro';
const validOrder = 4;
const noNameBody = { name: '', price: validprice, order: validOrder };
const noPriceBody = { name: validName, price: '', order: validOrder };
const noOrderBody = { name: validName, price: validprice, orderId: '' };
const validBody = { name: validName, price: validprice, orderId: validOrder };

export default {
    noNameBody,
    noPriceBody,
    noOrderBody,
    validBody,
};