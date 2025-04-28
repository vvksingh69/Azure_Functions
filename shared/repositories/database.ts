import { getCosmosClient } from '../cosmosClient';
import { getConfig } from '../config';
import { Database } from '@azure/cosmos';

let databaseInstance: Database = null;

export const getDatabase = async (): Promise<Database> => {
  if (databaseInstance) {
    return databaseInstance;
  }
  const config = await getConfig();
  const client = await getCosmosClient();
  databaseInstance = client.database(config.productsDBId);
  return databaseInstance;
};
