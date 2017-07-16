(function() {

  'use strict';

    // Pass the beersIndexCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('beersIndexCtrl', beersIndexCtrl);

    function beersIndexCtrl(beersFactory,$state) {

        // Inject with ng-annotate
        "ngInject";
        // Define beersIndex as this for ControllerAs and auto-$scope
        var beersIndex = this;
        // Define the beersIndex functions and objects that will be passed to the view
        beersIndex.beers = [];         // Array for list of beers

        index();
        beersIndex.msg="";
        // Get all beers.
        beersIndex.show = function(id){
            debugger
            $state.go("beers-show",{id:id});
        }

         beersIndex.update = function(id){
            debugger
            $state.go("beers-update",{id:id});
        }

        beersIndex.destroy = function(id){
            debugger
            $state.go("beers-destroy",{id:id});
        }

        beersIndex.store = function(){
            debugger
            $state.go("beers-store");
        }

        function index() {
            beersIndex.msg = "Carregando dados do Servidor...";

            return beersFactory.index().then(function(data) {
                debugger
                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);
                beersIndex.msg = "";
            	// Assign data to array and return them
	            beersIndex.beers = data.data;
	            return beersIndex.beers;

            }, function(data) {
                beersIndex.msg = "Houve uma falha ao buscar os dados";
                // Custom function for error handling
                console.log('Result form API with ERROR', data);

            });
        }
    }

})();
