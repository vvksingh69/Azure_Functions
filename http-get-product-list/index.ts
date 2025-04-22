import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { products } from '../products';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.');
  //   const name = req.query.name || (req.body && req.body.name);
  //   const responseMessage = name
  //     ? 'Hello, ' + name + '. This HTTP triggered function executed successfully.'
  //     : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

  // Handle preflight (OPTIONS) request
  if (req.method === 'OPTIONS') {
    context.res = {
      status: 204, // No Content
    };
    return;
  }

  context.res = {
    body: products,
  };
};

export default httpTrigger;
