backbone-interface
==================

An extension to Backbone core that allows interfaces to be implemented for stricter code organization.
Place your interfaces in separate files with comments, allowing an overview of your Model's methods. 
During implementation, errors will be thrown if the model does not contain the methods of the interface.
Not to be used in production.

Example:

```javascript

var ModelInterface = Backbone.Model.extend({
	
	// We can create a deeper object to implement // 
	apiMethods	: {
		lockDoor	: function(){}
	},
	
	unLock	: function(){},

	lock	: function(){}
	
});

var MyModel		= Backbone.Model.extend({
	
	/*
	 *	Implement the interface using the prototype
	 *	but this could just as easily be 
	 *	an object literal.
	 */
	
	_interface	: ModelInterface.prototype,
	apiMethods	: {
		lockDoor	: 1
	},
	unLock		: 'A string.'
	
});


new MyModel; // Throws an error //


```