import { AppConfigurationClient } from '@azure/app-configuration';

const connection_string = process.env.AZURE_APP_CONFIG_CONNECTION_STRING;
const client = new AppConfigurationClient(connection_string);
