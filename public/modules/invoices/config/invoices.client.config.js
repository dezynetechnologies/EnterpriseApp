'use strict';

// Configuring the Articles module
angular.module('invoices').run(['Menus',
    function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Invoices', 'invoices', 'dropdown', '/invoices(/create)?', false, ['salesuser', 'salesadmin', 'accountsuser', 'accountsadmin', 'deliveryuser', 'deliveryadmin', 'superadmin']);
        Menus.addSubMenuItem('topbar', 'invoices', 'List Invoices', 'invoices', 'invoices', false, ['salesuser', 'salesadmin', 'accountsuser', 'accountsadmin', 'deliveryuser', 'deliveryadmin', 'superadmin']);
        Menus.addSubMenuItem('topbar', 'invoices', 'New Invoice', 'invoices/create', 'invoices/create', false, ['salesuser', 'salesadmin', 'accountsuser', 'accountsadmin', 'superadmin']);
    }
]);