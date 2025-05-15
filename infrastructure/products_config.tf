resource "azurerm_app_configuration" "products_config" {
    location = "northeurope"
    name = "appconfig-products-service-sand-ne-vks-001"
    resource_group_name = azurerm_resource_group.product_service_rg.name

    sku = "free"
}