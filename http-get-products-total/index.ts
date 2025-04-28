import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getStock } from '../shared/repositories/stockRepository';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log(
    'HTTP trigger function processed a request to Get Total products.'
  );
  try {
    const stock = await getStock(context);
    const totalProducts = stock.reduce((acc, item) => acc + item.count, 0);
    context.res = {
      status: 200,
      body: {
        totalProducts,
      },
    };
  } catch (error) {
    context.log.error('Error in fetching Total Products:', error);
    context.res = {
      status: 500,
      body: { message: 'Internal Server Error fetching Total products' },
    };
  }
};

export default httpTrigger;
