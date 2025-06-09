import { AzureFunction, Context } from '@azure/functions';
import { Product, Stock } from '../shared/types';
import { v4 as uuidv4 } from 'uuid';
import { createProduct } from '../shared/repositories/productRepository';
import { createStock } from '../shared/repositories/stockRepository';
import { ProductWithStock } from '../shared/types';


const serviceBusTrigger: AzureFunction = async function (
  context: Context,
  productData: any
): Promise<void> {
  context.log('Service Bus message received', productData);

  const title: string = productData.Title;
  const description: string = productData.Description;
  const price = Number(productData.Price);
  const count = Number(productData.Count);

  // Validate product data
  // if (
  //   title ||
  //   description ||
  //   price ||
  //   count ||
  //   typeof price !== 'number' ||
  //   typeof count !== 'number'
  // ) {
  //   context.log.warn('Invalid product data received', {title, description, price, count})
  //   return;
  // }

  try {
    // Generate a new product ID (UUID)
    const productId = uuidv4();

    // Create new Product object
    const newProduct: Product = {
      id: productId,
      title,
      description,
      price
    };

    //create new stock object
    const newStock: Stock = {
      product_id: productId,
      count,
    };

    await Promise.all([
      createProduct(context, newProduct),
      createStock(context, newStock),
    ]);
    context.log(`Product ${productId} created successfully`)
  } catch (error) {
    // Handle errors
    context.log.error('Error creating product and stock:', error);
    throw error;
  }
};

export default serviceBusTrigger;