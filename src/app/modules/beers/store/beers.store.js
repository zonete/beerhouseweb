(function() {

  'use strict';

    // Pass the beersStoreCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('beersStoreCtrl', beersStoreCtrl);


    // Define the beersStoreCtrl
    function beersStoreCtrl(beersFactory,$state) {


        // Inject with ng-annotate
        "ngInject";


        // Define beersStore as this for ControllerAs and auto-$scope
        var beersStore = this;


        // Define the beersStore functions and objects that will be passed to the view
        beersStore.store = store;                                           // Store a resource
        beersStore.msg = "";
        beersStore.beer = {
            name:null,
            ingredients:null,
            alcoholContent:null,
            price:null,
            category:null
        };
        
        beersStore.cancel = function(){
            console.log("cancel");
            $state.go("beers-index");
        }

        // Delete a resource
        function store(data) {
            beersStore.msg="Enviando dados para o servidor...";
            return beersFactory.store(data).then(function(data) {

                // Custom function for success handling
                console.log('Result form API with SUCCESS', data);
                $state.go("beers-index");
            }, function(data) {
                
                // Custom function for error handling
                console.log('Result form API with ERROR', data);
                beersStore.msg = "Ocorreu um erro ao salvar o dado"

            });
        }
    }

})();
