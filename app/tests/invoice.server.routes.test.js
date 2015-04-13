'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Invoice = mongoose.model('Invoice'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, invoice;

/**
 * Invoice routes tests
 */
describe('Invoice CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Invoice
		user.save(function() {
			invoice = {
				name: 'Invoice Name'
			};

			done();
		});
	});

	it('should be able to save Invoice instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoice
				agent.post('/invoices')
					.send(invoice)
					.expect(200)
					.end(function(invoiceSaveErr, invoiceSaveRes) {
						// Handle Invoice save error
						if (invoiceSaveErr) done(invoiceSaveErr);

						// Get a list of Invoices
						agent.get('/invoices')
							.end(function(invoicesGetErr, invoicesGetRes) {
								// Handle Invoice save error
								if (invoicesGetErr) done(invoicesGetErr);

								// Get Invoices list
								var invoices = invoicesGetRes.body;

								// Set assertions
								(invoices[0].user._id).should.equal(userId);
								(invoices[0].name).should.match('Invoice Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Invoice instance if not logged in', function(done) {
		agent.post('/invoices')
			.send(invoice)
			.expect(401)
			.end(function(invoiceSaveErr, invoiceSaveRes) {
				// Call the assertion callback
				done(invoiceSaveErr);
			});
	});

	it('should not be able to save Invoice instance if no name is provided', function(done) {
		// Invalidate name field
		invoice.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoice
				agent.post('/invoices')
					.send(invoice)
					.expect(400)
					.end(function(invoiceSaveErr, invoiceSaveRes) {
						// Set message assertion
						(invoiceSaveRes.body.message).should.match('Please fill Invoice name');
						
						// Handle Invoice save error
						done(invoiceSaveErr);
					});
			});
	});

	it('should be able to update Invoice instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoice
				agent.post('/invoices')
					.send(invoice)
					.expect(200)
					.end(function(invoiceSaveErr, invoiceSaveRes) {
						// Handle Invoice save error
						if (invoiceSaveErr) done(invoiceSaveErr);

						// Update Invoice name
						invoice.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Invoice
						agent.put('/invoices/' + invoiceSaveRes.body._id)
							.send(invoice)
							.expect(200)
							.end(function(invoiceUpdateErr, invoiceUpdateRes) {
								// Handle Invoice update error
								if (invoiceUpdateErr) done(invoiceUpdateErr);

								// Set assertions
								(invoiceUpdateRes.body._id).should.equal(invoiceSaveRes.body._id);
								(invoiceUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Invoices if not signed in', function(done) {
		// Create new Invoice model instance
		var invoiceObj = new Invoice(invoice);

		// Save the Invoice
		invoiceObj.save(function() {
			// Request Invoices
			request(app).get('/invoices')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Invoice if not signed in', function(done) {
		// Create new Invoice model instance
		var invoiceObj = new Invoice(invoice);

		// Save the Invoice
		invoiceObj.save(function() {
			request(app).get('/invoices/' + invoiceObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', invoice.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Invoice instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Invoice
				agent.post('/invoices')
					.send(invoice)
					.expect(200)
					.end(function(invoiceSaveErr, invoiceSaveRes) {
						// Handle Invoice save error
						if (invoiceSaveErr) done(invoiceSaveErr);

						// Delete existing Invoice
						agent.delete('/invoices/' + invoiceSaveRes.body._id)
							.send(invoice)
							.expect(200)
							.end(function(invoiceDeleteErr, invoiceDeleteRes) {
								// Handle Invoice error error
								if (invoiceDeleteErr) done(invoiceDeleteErr);

								// Set assertions
								(invoiceDeleteRes.body._id).should.equal(invoiceSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Invoice instance if not signed in', function(done) {
		// Set Invoice user 
		invoice.user = user;

		// Create new Invoice model instance
		var invoiceObj = new Invoice(invoice);

		// Save the Invoice
		invoiceObj.save(function() {
			// Try deleting Invoice
			request(app).delete('/invoices/' + invoiceObj._id)
			.expect(401)
			.end(function(invoiceDeleteErr, invoiceDeleteRes) {
				// Set message assertion
				(invoiceDeleteRes.body.message).should.match('User is not logged in');

				// Handle Invoice error error
				done(invoiceDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Invoice.remove().exec();
		done();
	});
});