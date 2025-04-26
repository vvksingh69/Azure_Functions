import { AppConfigurationClient } from '@azure/app-configuration';

const connectionString = process.env.AZURE_APP_CONFIG_CONNECTION_STRING;

if (!connectionString) {
  throw new Error('Missing Azure App Configuration connection string');
}

export const appConfigClient = new AppConfigurationClient(connectionString);
