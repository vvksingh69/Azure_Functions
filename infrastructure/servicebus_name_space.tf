/* Docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/servicebus_namespace.html */
resource "azurerm_servicebus_namespace" "sb" {
  name                          = "products-service-servicebus-vks-001"
  location                      = azurerm_resource_group.product_service_rg.location
  resource_group_name           = azurerm_resource_group.product_service_rg.name
  sku                           = "Basic"
  capacity                      = 0 /* standard for sku plan */
  public_network_access_enabled = true /* can be changed to false for premium */
  minimum_tls_version           = "1.2"
  zone_redundant                = false /* can be changed to true for premium */
}