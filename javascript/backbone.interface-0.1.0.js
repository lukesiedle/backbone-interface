
/*
 *	@version
 *	0.1.0
 *
 *	@author
 *	Luke Siedle
 *	http://lukesiedle.me
 *	https://github.com/luke-siedle/backbone-interface
 *	
 *	@license
 *	MIT License
 *	
 */

;(function(){
	
	// Apply to all aspects of Backbone //
	var contexts	= { 
		Model		: Backbone.Model, 
		View		: Backbone.View, 
		Collection	: Backbone.Collection, 
		Router		: Backbone.Router 
	};
	
	_.each( contexts, function( each, i ){
		var prototype	= each.prototype,
			extend		= each.extend,
			Constructor	= each;
		
		// Rewrite constructor //
		Backbone[ i ]	= function(){
			Constructor.apply( this, arguments );
			
			// Implement interface after initialization //
			if( this._interface ){
				Backbone.Implements.call( this, this._interface );
			}
		}
		
		// Restore other properties //
		Backbone[ i ].prototype = prototype;
		Backbone[ i ].extend	= extend;
		
	});
	
	Backbone.Implements		= function( theInterface ){
		
		_.each( theInterface, function( obj, x ){
			var self = this[ x ];
			if( _.isFunction( obj ) ){
				if( ! self || ! _.isFunction( self ) ){
					Err( x, 'function', self );
				}
			}
			
			if( _.isObject(obj) && ! _.isObject( self ) ){
				Err( x, 'object', self );
			} else {
				// Recurse //
				Backbone.Implements.call( self, obj );
			}
			
		}, this );
		
		function Err( name, type, got ){
			throw new Error('(' + type + ') ' + name + ' '
				+ 'expected by interface but got ('
				+ typeof(got) + ') ' + got + ' instead.');
		}
	}
	
})( );