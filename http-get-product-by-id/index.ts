import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { products } from '../products';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.');
  const productId = req.params.productId;
  const product = products.filter((product) => product.id === productId);
  const responseMessage = product;
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
    headers: {
      'Access-Control-Allow-Origin': '*', // or specific origin
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  };
};

export default httpTrigger;
