'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var invoices = require('../../app/controllers/invoices.server.controller');

	// Invoices Routes
	app.route('/invoices')
		.get(invoices.list)
		.post(users.requiresLogin, invoices.create);

	app.route('/invoices/:invoiceId')
		.get(invoices.read)
		.put(users.requiresLogin, invoices.hasAuthorization, invoices.update)
		.delete(users.requiresLogin, invoices.hasAuthorization, invoices.delete);

	// Finish by binding the Invoice middleware
	app.param('invoiceId', invoices.invoiceByID);
};
