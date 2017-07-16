(function() {

  'use strict';

    // Pass the beersShowCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('beersShowCtrl', beersShowCtrl);


    // Define the beersShowCtrl
    function beersShowCtrl(beersFactory, $stateParams,$state) {


        // Inject with ng-annotate
        "ngInject";


        // Define beersShow as this for ControllerAs and auto-$scope
        var beersShow = this;


        // Define the beersShow functions and objects that will be passed to the view
        beersShow.beer = {};                                                // Object for show the beer
        beersShow.cancel = function(){
            
            $state.go("beers-index");
        }

        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */


       
        show($stateParams.id);



        // Get the beer
        function show(id) {

            return beersFactory.show(id).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);
                
            	// Assign data to array and return them
	            beersShow.beer = data;
	            return beersShow.beer;

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();
