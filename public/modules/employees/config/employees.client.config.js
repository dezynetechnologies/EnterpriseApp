'use strict';

// Configuring the Articles module
angular.module('employees').run(['Menus',
 function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Employees', 'employees', 'dropdown', '/employees(/create)?', false, ['salesuser', 'salesadmin', 'accountsuser', 'accountsadmin', 'deliveryuser', 'deliveryadmin', 'superadmin', 'engineeringuser']);
        Menus.addSubMenuItem('topbar', 'employees', 'List Employees', 'employees', 'employees', false, ['salesuser', 'salesadmin', 'accountsuser', 'accountsadmin', 'deliveryuser', 'deliveryadmin', 'superadmin', 'engineeringuser']);
        Menus.addSubMenuItem('topbar', 'employees', 'New Employee', 'employees/create', 'employees/create', false, ['superadmin']);
 }
]);
