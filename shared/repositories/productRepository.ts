import { getDatabase } from './database';
import { Product } from '../types';
import { Container } from '@azure/cosmos';
import { getConfig } from '../config';
import { Context } from '@azure/functions';

let containerInstance: Container | null = null;

const getProductContainer = async (): Promise<Container> => {
  if (containerInstance) {
    return containerInstance;
  }
  const database = await getDatabase();
  const config = await getConfig();
  containerInstance = database.container(config.productsContainerId);

  return containerInstance;
};

export const getProducts = async (context: Context): Promise<Product[]> => {
  try {
    const containerInstance = await getProductContainer();
    const { resources } = await containerInstance.items
      .query('SELECT * FROM products')
      .fetchAll();
    return resources;
  } catch (error) {
    context.log.error('Error querying products', error);
    throw new Error('Failed to fetch products from database');
  }
};

export const getProductById = async (
  productId: string,
  context: Context
): Promise<Product> => {
  try {
    const containerInstance = await getProductContainer();

    context.log('Fetching product by id:', productId);

    const { resource } = await containerInstance
      .item(productId, productId)
      .read<Product>();

    if (!resource) {
      context.log.warn(`Product with id ${productId} not found.`);
      throw new Error('Product not found');
    }

    context.log('Fetched product:', resource);

    const { _rid, _self, _etag, _ts, ...cleanProduct } = resource;

    return {
      id: cleanProduct.id,
      title: cleanProduct.title,
      description: cleanProduct.description,
      price: cleanProduct.price,
    };
  } catch (error) {
    context.log.error(`Error querying Product with id: ${productId}`, error);
    throw new Error(
      `Failed to fetch Product with id: ${productId} from the database`
    );
  }
};

export const createProduct = async (
  context: Context,
  newProduct: Product
): Promise<void> => {
  try {
    const containerInstance = await getProductContainer();
    await containerInstance.items.create(newProduct);
  } catch (error) {
    context.log.error('Error creating products', error);
    throw new Error('Failed to create a new product inside the database');
  }
};
