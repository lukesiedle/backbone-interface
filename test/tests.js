;(function () {
    module('Backbone.Interface');

    test('Test for shallow interface equality', function () {
        var MyInterface = Backbone.Model.extend({
            methodA: function () {},
            methodB: function () {}
        });
        var MyModel = Backbone.Model.extend({
            _interface: MyInterface.prototype,
            methodA: function () {},
            methodB: function () {}
        });

        try {
            new MyModel();
        } catch (e) {
            ok(false, 'Errors were thrown even though Model has correct methods.');
            return;
        }

        ok(true, 'All required methods were found.');
    });

    test('Test for deep interface equality', function () {
        var MyInterface = Backbone.Model.extend({
            apiMethods: {
                methodA: function () {},
                methodB: function () {},
                other: {
                    methodD: function () {}
                }
            },
            methodC: function () {}
        });
        var MyModel = Backbone.Model.extend({
            _interface: MyInterface.prototype,
            apiMethods: {
                methodA: function () {},
                methodB: function () {},
                other: {
                    methodD: function () {}
                }
            },
            methodC: function () {}
        });

        try {
            new MyModel();
        } catch (e) {
            ok(false, 'Errors were thrown even though Model has correct methods.');
            return;
        }

        ok(true, 'All required methods were found.');
    });

    test('Test for shallow interface inequality', function () {
        var MyInterface = Backbone.Model.extend({
            methodA: function () {},
            methodB: function () {},
            methodC: function () {}
        });
        var MyModel = Backbone.Model.extend({
            _interface: MyInterface.prototype,
            methodA: function () {},
            methodB: function () {}
        });

        try {
            new MyModel();
        } catch (e) {
            ok(true, 'Model is missing methods, which is correct. Following error was thrown and caught: ' + e.message);
            return;
        }

        ok(false, 'Model is missing methods, but no errors were thrown.');
    });

    test('Test for deep interface inequality', function () {
        var MyInterface = Backbone.Model.extend({
            apiMethods: {
                methodA: function () {},
                methodB: function () {},
                other: {
                    methodD: function () {},
                    methodE: function () {}
                }
            },
            methodC: function () {}
        });
        var MyModel = Backbone.Model.extend({
            _interface: MyInterface.prototype,
            apiMethods: {
                methodA: function () {},
                methodB: function () {},
                other: {
                    methodD: function () {}
                }
            },
            methodC: function () {}
        });

        try {
            new MyModel();
        } catch (e) {
            ok(true, 'Model is missing methods, which is correct. Following error was thrown and caught : ' + e.message);
            return;
        }

        ok(false, 'Model is missing methods, but no errors were thrown.');
    });

    test('Test for type handling (number)', function () {
        var MyInterface = Backbone.Model.extend({
            methodA: function () {},
            methodB: function () {},
            methodC: function () {}
        });
        var MyModel = Backbone.Model.extend({
            _interface: MyInterface.prototype,
            methodA: function () {},
            methodB: 2,
            methodC: function () {}
        });

        try {
            new MyModel();
        } catch (e) {
            ok(true, 'Model has incorrect properties, which is correct. Following error was thrown and caught: ' + e.message);
            return;
        }

        ok(false, 'Model has incorrect properties, but no errors were thrown.');
    });

    test('Test for type handling (string)', function () {
        var MyInterface = Backbone.Model.extend({
            methodA: function () {},
            methodB: function () {},
            methodC: function () {}
        });
        var MyModel = Backbone.Model.extend({
            _interface: MyInterface.prototype,
            methodA: function () {},
            methodB: 'String',
            methodC: function () {}
        });

        try {
            new MyModel();
        } catch (e) {
            ok(true, 'Model has incorrect properties, which is correct. Following error was thrown and caught: ' + e.message);
            return;
        }

        ok(false, 'Model has incorrect properties, but no errors were thrown.');
    });

    test('Test for type handling (boolean) false', function () {
        var MyInterface = Backbone.Model.extend({
            methodA: function () {},
            methodB: function () {},
            methodC: function () {}
        });
        var MyModel = Backbone.Model.extend({
            _interface: MyInterface.prototype,
            methodA: function () {},
            methodB: false,
            methodC: function () {}
        });

        try {
            new MyModel();
        } catch (e) {
            ok(true, 'Model has incorrect properties, which is correct. Following error was thrown and caught: ' + e.message);
            return;
        }

        ok(false, 'Model has incorrect properties, but no errors were thrown.');
    });

    test('Test for type handling (boolean) true', function () {
        var MyInterface = Backbone.Model.extend({
            methodA: function () {},
            methodB: function () {},
            methodC: function () {}
        });
        var MyModel = Backbone.Model.extend({
            _interface: MyInterface.prototype,
            methodA: function () {},
            methodB: true,
            methodC: function () {}
        });

        try {
            new MyModel();
        } catch (e) {
            ok(true, 'Model has incorrect properties, which is correct. Following error was thrown and caught: ' + e.message);
            return;
        }

        ok(false, 'Model has incorrect properties, but no errors were thrown.');
    });

    test('Test for define list of interfaces (boolean) true', function () {
        var MyInterface1 = Backbone.Model.extend({
            method1: function () {}
        });
        var MyInterface2 = Backbone.Model.extend({
            method2: function () {}
        });
        var MyModel = Backbone.Model.extend({
            _interface: [
                MyInterface1.prototype,
                MyInterface2.prototype
            ],
            method1: function () {},
            method2: function () {}
        });

        try {
            new MyModel();
        } catch (e) {
            ok(false, 'Model has not implements two interfaces. Following error was thrown and caught: ' + e.message);
        }

        ok(true, 'Model has implements two interfaces, and no errors were thrown.');
    });

    test('Test for define list of interfaces (boolean) false', function () {
        var MyInterface1 = Backbone.Model.extend({
            method1: function () {}
        });
        var MyInterface2 = Backbone.Model.extend({
            method2: function () {}
        });
        var MyModel = Backbone.Model.extend({
            _interface: [
                MyInterface1.prototype,
                MyInterface2.prototype
            ],
            method1: function () {},
            method3: function () {}
        });

        try {
            new MyModel();
        } catch (e) {
            ok(true, 'Model has not implements two interfaces. Following error was thrown and caught: ' + e.message);
            return;
        }

        ok(false, 'Model has implements two interfaces, and no errors were thrown.');
    });
})();
