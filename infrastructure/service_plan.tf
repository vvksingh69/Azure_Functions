resource "azurerm_service_plan" "product_service_plan" {
  name                = "asp-product-service-sand-ne-002"
  location            = "northeurope"
  os_type             = "Windows"
  sku_name            = "Y1"
  resource_group_name = azurerm_resource_group.product_service_rg.name
}
