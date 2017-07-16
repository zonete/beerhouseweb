(function() {

    'use strict';

    // Pass the beersValidator to the app
    angular
        .module('craftbeerweb')
        .run(beersValidator);


    // Define the beersValidator
    function beersValidator(validatorHelper) {


        // Inject with ng-annotate
        "ngInject";


        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */


        validatorHelper.configureValidators(getValidators()); // Intercept all the api and add them to the httpBackend



        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        |
        | Declaring all functions used in the beersValidator
        |
        */



        // Function that pass the array that will create the model validator
        function getValidators() {

            // Object to pass with validation rules
            return {
                'beer': {
                    'name': {
                        'size': {
                            'min': 2,
                            'max': 10,
                            'message': 'name must be between 2 and 10 characters.'
                        },
                        'required': {
                            'message': 'name is required.'
                        }
                    }
                }
            };

        }
    }

})();
