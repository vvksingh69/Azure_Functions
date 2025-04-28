import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { Product, Stock } from '../shared/types';
import { v4 as uuidv4 } from 'uuid';
import { createProduct } from '../shared/repositories/productRepository';
import { createStock } from '../shared/repositories/stockRepository';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.');

  const newProductData = req.body;
  context.log('HTTP POST /products triggered with data:', newProductData);

  // Validate product data
  if (
    !newProductData.title ||
    !newProductData.description ||
    !newProductData.price ||
    !newProductData.count ||
    typeof newProductData.price !== 'number' ||
    typeof newProductData.count !== 'number'
  ) {
    context.res = {
      status: 400,
      body: {
        message:
          'Invalid product data. Please provide title, description, and price.',
      },
    };
    return;
  }

  try {
    // Generate a new product ID (UUID)
    const productId = uuidv4();

    // Create new Product object
    const newProduct: Product = {
      id: productId,
      title: newProductData.title,
      description: newProductData.description,
      price: newProductData.price,
    };

    //create new stock object
    const newStock: Stock = {
      product_id: productId,
      count: newProductData.count,
    };

    await Promise.all([
      createProduct(context, newProduct),
      createStock(context, newStock),
    ]);
    context.res = {
      status: 201,
      body: {
        message: 'Product created Successfully',
      },
    };
  } catch (error) {
    // Handle errors
    context.log.error('Error creating product and stock:', error);
    context.res = {
      status: 500,
      body: { message: 'Internal Server Error while creating product' },
    };
  }
};

export default httpTrigger;
