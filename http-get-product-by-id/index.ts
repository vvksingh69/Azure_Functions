import { AzureFunction, Context, HttpRequest } from '@azure/functions';
//import { products } from '../products';
import { getProductById } from '../shared/repositories/productRepository';
import { getStockById } from '../shared/repositories/stockRepository';
import { ProductWithStock } from '../shared/types';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const productId = req.params.productId;
  context.log(
    'HTTP trigger function processed a request get Product by Id with id',
    productId
  );
  try {
    const productPromise = getProductById(productId, context);
    const stockPromise = getStockById(productId, context);
    const [product, stock] = await Promise.all([productPromise, stockPromise]);

    const productWithStock: ProductWithStock = {
      ...product,
      count: stock.count,
    };
    console.log('Product with Stock', productWithStock);
    context.res = {
      body: productWithStock,
    };
  } catch (error) {
    context.log.error('Error in fetching Product with Id :', error);
    context.res = {
      status: 500,
      body: { message: 'Internal Server Error fetching product' },
    };
  }
};

export default httpTrigger;
