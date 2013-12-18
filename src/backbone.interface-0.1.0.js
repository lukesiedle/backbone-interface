(function() {

	// Define blank Backbone.Interface class
	Backbone.Interface = function() {};
		
	// Assign the extend method to Backbone.Interface
	Backbone.Interface.extend = Backbone.Model.extend;

	// A local method to extend the prototype
	function implements(Interface) {
		 _.extend(this.prototype, Interface.prototype);
	}

	// Set up inheritance for the model, collection, router, view and history.
	Backbone.Model.implements = Backbone.Collection.implements = Backbone.Router.implements = Backbone.View.implements = Backbone.History.implements = implements;

	// Alias for 'implements'. Some people prefer 'implement'
	Backbone.Model.implement = Backbone.Collection.implement = Backbone.Router.implement = Backbone.View.implement = Backbone.History.implement = implements;

}());
