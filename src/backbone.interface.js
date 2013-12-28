/**
 * @version 0.2.0
 *
 * @author Luke Siedle http://lukesiedle.me
 * @author Piotr Kowalski http://piecioshka.pl
 *
 * @see https://github.com/luke-siedle/backbone-interface
 *
 * @license MIT License
 */
;(function () {

    // Apply to all aspects of Backbone
    var contexts = {
        Model: Backbone.Model,
        View: Backbone.View,
        Collection: Backbone.Collection,
        Router: Backbone.Router
    };

    _.each(contexts, function (each, i) {
        var prototype = each.prototype,
            extend = each.extend,
            Constructor = each;

        // Rewrite constructor
        Backbone[i] = function () {
            Constructor.apply(this, arguments);

            // Implement interface after initialization
            if (this._interface) {
                if (_.isArray(this._interface)) {
                    _.each(this._interface, function (_interface) {
                        Backbone.Implements.call(this, _interface);
                    }.bind(this));
                } else if (_.isObject(this._interface)) {
                    Backbone.Implements.call(this, this._interface);
                } else {
                    throw new Error('unexpected data type');
                }
            }
        };

        // Restore other properties
        Backbone[i].prototype = prototype;
        Backbone[i].extend = extend;
    });

    Backbone.Implements = function (theInterface) {
        _.each(theInterface, function (obj, x) {
            var self = this[x];
            if (_.isFunction(obj)) {
                if (!self || !_.isFunction(self)) {
                    Err(x, 'function', self);
                }
            }

            if (_.isObject(obj) && !_.isObject(self)) {
                Err(x, 'object', self);
            } else {
                // Recursion
                Backbone.Implements.call(self, obj);
            }
        }, this);

        function Err(name, type, got) {
            throw new Error('(' + type + ') ' + name + ' '
                + 'expected by interface but got ('
                + typeof(got) + ') ' + got + ' instead.');
        }
    }

})();
