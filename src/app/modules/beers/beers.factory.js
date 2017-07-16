(function() {

  'use strict';

    // Pass the beersFactory to the app
    angular
        .module('craftbeerweb')
        .factory('beersFactory', beersFactory);

    // Define the beersFactory
    function beersFactory($http) {
        // Inject with ng-annotate
        "ngInject";

        // Define base URI for beer beer
        var beerBase = 'http://localhost:9000/beerhouse/beers/';


        // Define the beer factory object to return
        var beersFactory = {

            index: index,
            show: show,
            store: store,
            update: update,
            destroy: destroy,

        };


        // Return the beer factory
        return beersFactory;

        // Display a listing of beers.
        function index() {

            return $http.get(beerBase)
                        .then(function(data){ 
                            console.log(data);
                            return data; });
        }


        // Display a specified beer.
        function show(id) {

            return $http.get(beerBase + id)
                        .then(function(data){ return data.data; });
        }


        // Store a newly created beer in storage.
        function store(data) {

            return $http.post(beerBase, data)
                        .then(function(data){ return data.data; });
        }


        // Update the specified beer in storage.
        function update(id, data) {

            return $http.put(beerBase + id, data)
                        .then(function(data){ return data.data; });
        }


        // Remove the specified beer from storage.
        function destroy(id) {

            return $http.delete(beerBase + id)
                        .then(function(data){ return data.data; });
        }

    }

})();
