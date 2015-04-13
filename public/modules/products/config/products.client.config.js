'use strict';

// Configuring the Articles module
angular.module('products').run(['Menus',
    function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Products', 'products', 'dropdown', '/products(/create)?', false, ['salesuser', 'salesadmin', 'accountsuser', 'accountsadmin', 'customeruser', 'engineeringuser', 'deliveryuser', 'deliveryadmin', 'superadmin']);
        Menus.addSubMenuItem('topbar', 'products', 'List Products', 'products', 'products', false, ['salesuser', 'salesadmin', 'accountsuser', 'accountsadmin', 'customeruser', 'engineeringuser', 'deliveryuser', 'deliveryadmin', 'superadmin']);
        Menus.addSubMenuItem('topbar', 'products', 'New Product', 'products/create', 'products/create', false, ['accountsuser', 'accountsadmin', 'engineeringuser', 'superadmin']);
    }
]);