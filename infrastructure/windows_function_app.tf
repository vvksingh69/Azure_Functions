resource "azurerm_windows_function_app" "products_service" {
  name                        = "fa-products-service-ne-002"
  location                    = "northeurope"
  service_plan_id             = azurerm_service_plan.product_service_plan.id
  resource_group_name         = azurerm_resource_group.product_service_rg.name
  storage_account_name        = azurerm_storage_account.products_service_fa.name
  storage_account_access_key  = azurerm_storage_account.products_service_fa.primary_access_key
  functions_extension_version = "~4"
  builtin_logging_enabled     = false

  site_config {
    always_on = false

    application_insights_key               = azurerm_application_insights.products_service_fa_002.instrumentation_key
    application_insights_connection_string = azurerm_application_insights.products_service_fa_002.connection_string

    use_32_bit_worker = true

    cors {
      allowed_origins = ["https://portal.azure.com"]
    }

    application_stack {
      node_version = "~16"
    }
  }

  app_settings = {
    WEBSITE_CONTENTAZUREFILECONNECTIONSTRING = azurerm_storage_account.products_service_fa.primary_connection_string
    WEBSITE_CONTENTSHARE                     = azurerm_storage_share.products_service_fa.name
  }

  lifecycle {
    ignore_changes = [
      app_settings,
      site_config["application_stack"],
      tags["hidden-link: /app-insights-instrumentation-key"],
      tags["hidden-link: /app-insights-resource-id"],
      tags["hidden-link: /app-insights-conn-string"]
    ]
  }
}
