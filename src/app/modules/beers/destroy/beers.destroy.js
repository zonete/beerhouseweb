(function() {

  'use strict';
    angular
        .module('craftbeerweb')
        .controller('beersDestroyCtrl', beersDestroyCtrl);
    function beersDestroyCtrl(beersFactory, $stateParams,$state) {
        // Inject with ng-annotate
        "ngInject";

        var beersDestroy = this;
        beersDestroy.beer = {};                                                 // Object for show the beer
        beersDestroy.destroy = destroy;                                         // Delete a resource
        beersDestroy.msg ="";
        beersDestroy.cancel = function(){
            console.log("cancel");
            $state.go("beers-index");
        }

        initLog();
        show($stateParams.id);
        

        // Sample for init function
        function initLog() {

            console.log('beersDestroyCtrl init');
        }


        // Delete a resource
        function destroy(id) {
        debugger
            return beersFactory.destroy(id).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);
                 $state.go("beers-index");
            }, function(data) {
                beersDestroy.msg ="ocorreu um erro no servidor";
            	// Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }


        // Get the beer
        function show(id) {
            
            return beersFactory.show(id).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

                // Assign data to array and return them
                beersDestroy.beer = data;

                return beersDestroy.beer;

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();
