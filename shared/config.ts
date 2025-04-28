import { appConfigClient } from './appConfig';

interface AppConfig {
  cosmosDBEndPoint: string;
  cosmosDBKey: string;
  productsDBId: string;
  productsContainerId: string;
  stockContainerId: string;
  cosmosDBConnectionString: string;
}

let config: AppConfig | null = null;

export const getConfig = async (): Promise<AppConfig> => {
  if (config) {
    return config;
  }

  const settings = await appConfigClient.listConfigurationSettings({});

  const configMap: Record<string, string> = {};

  for await (const setting of settings) {
    if (setting.key && setting.value !== undefined) {
      configMap[setting.key] = setting.value;
    }
  }

  config = {
    cosmosDBEndPoint: configMap['CosmosDb:DB_ENDPOINT'],
    cosmosDBKey: configMap['CosmosDb:DB_KEY'],
    productsDBId: configMap['CosmosDb:DB_ID'],
    productsContainerId: configMap['CosmosDb:PRODUCTS_CONTAINER_ID'],
    stockContainerId: configMap['CosmosDb:STOCK_CONTAINER_ID'],
    cosmosDBConnectionString: configMap['CosmosDb:ConnectionString'],
  };

  return config;
};
