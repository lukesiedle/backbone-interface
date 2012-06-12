
/* 
 *	@tests 
 */

/*
*	Now that we have an interface,
*	we can comment on what each
*	method does, and expose a 
*	list of required objects and
*	functions. The interface must
*	be excluded in production.
*/

// Models //

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

try {
	new MyModel;
} catch( e ){
	console.log( e );
}

// Views // 
var ViewInterface		= {
	showKeypad			: function(){},
	hideKeypad			: function(){}
};

var MyView				= Backbone.View.extend({
	_interface			: ViewInterface,
	showKeypad			: function(){}
});

try {
	new MyView;
} catch( e ){
	console.log( e );
}


// Collections //
var CollectionInterface = {
	getCombinations		: function(){}
};

var MyCollection	= Backbone.Collection.extend({
	_interface			: CollectionInterface,
	getCombinations		: 'test'
});

try {
	new MyCollection;
} catch( e ){
	console.log( e );
}

// Router //

var RouterInterface		= {
	defaultRoute		: function(){}
};

var MyRouter		= Backbone.Router.extend({
	_interface		: RouterInterface
});

// Uncaught //
new MyRouter;