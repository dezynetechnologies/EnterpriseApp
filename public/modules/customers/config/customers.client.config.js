'use strict';

// Configuring the Articles module
angular.module('customers').run(['Menus',
    function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Customers', 'customers', 'dropdown', '/customers(/create)?', false, ['salesuser', 'salesadmin', 'accountsuser', 'accountsadmin', 'deliveryuser', 'deliveryadmin', 'superadmin']);
        Menus.addSubMenuItem('topbar', 'customers', 'List Customers', 'customers', 'customers', false, ['salesuser', 'salesadmin', 'accountsuser', 'accountsadmin', 'deliveryuser', 'deliveryadmin', 'superadmin']);
        Menus.addSubMenuItem('topbar', 'customers', 'New Customer', 'customers/create', 'customers/create', false, ['salesuser', 'salesadmin', 'accountsuser', 'accountsadmin', 'superadmin']);
    }
]);
