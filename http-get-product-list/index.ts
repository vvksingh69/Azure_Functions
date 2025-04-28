import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getProducts } from '../shared/repositories/productRepository';
import { getStock } from '../shared/repositories/stockRepository';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request get Products.');
  if (req.method === 'OPTIONS') {
    context.res = {
      status: 204, // No Content
    };
    return;
  }
  try {
    const products = await getProducts(context);
    const stocks = await getStock(context);

    const stockMap = new Map<string, number>();
    stocks.forEach((stock) => {
      stockMap.set(stock.product_id, stock.count);
    });

    const productsWithStock = products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      count: stockMap.get(product.id) ?? 0,
    }));
    context.res = {
      body: productsWithStock,
    };
  } catch (error) {
    context.log.error('Error in fetching products list:', error);
    context.res = {
      status: 500,
      body: { message: 'Internal Server Error fetching product list' },
    };
  }
};

export default httpTrigger;
