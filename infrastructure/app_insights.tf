resource "azurerm_application_insights" "products_service_fa_003" {
  name                 = "appins-fa-products-service-sand-ne-003"
  application_type     = "web"
  location             = "northeurope"
  resource_group_name  = azurerm_resource_group.product_service_rg.name
}
