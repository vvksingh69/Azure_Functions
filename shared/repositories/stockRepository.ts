import { getDatabase } from './database';
import { Stock } from '../types';
import { Container } from '@azure/cosmos';
import { getConfig } from '../config';
import { Context } from '@azure/functions';

let containerInstance: Container | null = null;

const getStockContainer = async (): Promise<Container> => {
  if (containerInstance) {
    return containerInstance;
  }
  const database = await getDatabase();
  const config = await getConfig();
  containerInstance = database.container(config.stockContainerId);

  return containerInstance;
};

export const getStock = async (context: Context): Promise<Stock[]> => {
  const containerInstance = await getStockContainer();
  try {
    const { resources } = await containerInstance.items
      .query('SELECT * FROM stock')
      .fetchAll();
    console.log('Stock resources', resources);
    return resources;
  } catch (error) {
    context.log.error('Error querying Stocks', error);
    throw new Error('Failed to fetch Stocks from database');
  }
};

export const getStockById = async (
  productId: string,
  context: Context
): Promise<Stock> => {
  try {
    const containerInstance = await getStockContainer();

    context.log('Fetching stock for product id:', productId);

    // Define the query to fetch stock by product_id (partition key)
    const querySpec = {
      query: 'SELECT * FROM stock s WHERE s.product_id = @productId',
      parameters: [
        {
          name: '@productId',
          value: productId, // Use product_id as the partition key value
        },
      ],
    };

    // Execute the query
    const { resources } = await containerInstance.items
      .query(querySpec)
      .fetchAll();

    // Check if we found any stock records
    if (resources.length === 0) {
      context.log.warn(`No stock found for product id ${productId}.`);
      throw new Error('Stock not found');
    }

    // Return the first stock record (assuming product_id is unique)
    context.log('Fetched stock:', resources[0]);

    return resources[0];
  } catch (error) {
    context.log.error(`Error querying Stock with id: ${productId}`, error);
    throw new Error(
      `Failed to fetch Stock with id: ${productId} from the database`
    );
  }
};

export const createStock = async (
  context: Context,
  newStock: Stock
): Promise<void> => {
  const containerInstance = await getStockContainer();
  try {
    await containerInstance.items.create(newStock);
  } catch (error) {
    context.log.error('Error creating Stocks', error);
    throw new Error('Failed to create Stocks into database');
  }
};
