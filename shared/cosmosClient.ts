import { CosmosClient } from '@azure/cosmos';
import { getConfig } from './config';

let cosmosClient: CosmosClient | null;

export const getCosmosClient = async (): Promise<CosmosClient> => {
  if (cosmosClient) {
    return cosmosClient;
  }

  const config = await getConfig();
  cosmosClient = new CosmosClient(config.cosmosDBConnectionString);
  return cosmosClient;
};
