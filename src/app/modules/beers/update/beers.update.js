(function() {

  'use strict';

    // Pass the beersUpdateCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('beersUpdateCtrl', beersUpdateCtrl);


    // Define the beersUpdateCtrl
    function beersUpdateCtrl(beersFactory, $stateParams,$state) {


        // Inject with ng-annotate
        "ngInject";


        // Define beersUpdate as this for ControllerAs and auto-$scope
        var beersUpdate = this;


        // Define the beersUpdate functions and objects that will be passed to the view
        beersUpdate.beer = {};                                                  // Object for show the beer
        beersUpdate.update = update;                                            // Update a resource
        beersUpdate.msg="";  

       
        beersUpdate.cancel = function(){
            console.log("cancel");
            $state.go("beers-index");
        }
        initLog();
        show($stateParams.id);


    
        // Sample for init function
        function initLog() {

            console.log('beersUpdateCtrl init');
        }


        // Delete a resource
        function update(id, data) {
            if(data.name){

                return beersFactory.update(id, data).then(function(data) {

                    // Custom function for success handling
                    console.log('Result form API with SUCCESS', data);
                    $state.go("beers-index");
                }, function(data) {
                    beersUpdate.msg="Ocorreu um erro: " +data; 
                    // Custom function for error handling
                    console.log('Result form API with ERROR', data);

                });
            }
            else{
                beersUpdate.msg = "Preencha o campo nome";

            }
        }


        // Get the beer
        function show(id) {

            return beersFactory.show(id).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);

                // Assign data to array and return them
                beersUpdate.beer = data;
                return beersUpdate.beer;

            }, function(data) {

                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();
