resource "azurerm_storage_account" "products_service_fa" {
  name                     = "stgsangproductsfanevs003"
  location                 = "northeurope"
  account_replication_type = "LRS"
  account_tier              = "Standard"
  account_kind              = "StorageV2"
  resource_group_name      = azurerm_resource_group.product_service_rg.name
}
