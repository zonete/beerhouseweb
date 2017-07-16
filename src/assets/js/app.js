(function(){

	'use strict';

	// Define angular core.mocking module
	angular.module('core.mocking', ['ngMockE2E']);

})();
(function(){

	'use strict';

	// Define angular core.routing module
	angular.module('core.routing', ['ui.router']);

})();
(function() {

    'use strict';

    // Define angular core.validator module
    angular.module('core.validator', ['valdr']);

})();

(function(){

	'use strict';

	// Define angular app module
	angular.module('craftbeerweb', ['core.routing', 'core.mocking', 'core.validator', 'ui.router','ngMaterial']);

})();

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

(function() {

  'use strict';

    // Pass the beersMock to the app
	angular
	    .module('craftbeerweb')
	    .run(beersMock);


	// Define the beersMock
    function beersMock(mockHelper) {


        // Inject with ng-annotate
        "ngInject";


        // Object for beer's mock
        var beers = {};


        /*
        |--------------------------------------------------------------------------
        | Contrsucts function
        |--------------------------------------------------------------------------
        |
        | All functions that should be init when the controller start
        |
        */


    	setbeers();															            // Set the list of beer
    	mockHelper.configureMocks(getMocks()); 									        // Intercept all the api and add them to the httpBackend



	    /*
	    |--------------------------------------------------------------------------
	    | Functions
	    |--------------------------------------------------------------------------
	    |
	    | Declaring all functions used in the beersMock
	    |
	    */


		// Function for destroy beers API
		function destroyRespond(method, url, data, headers, params) {

            // Get the id param from url
            var id = url.split("/").pop();

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

                // Delete beer by id from beer's array
                for(var i = 0; i <= beers.length - 1; i++) {

                    // If beer exists
                    if(beers[i].id == id) {

                        // Delete  beer
                        beers.splice(i, 1);

                        // Return the success header
                        return [header, {data: 'beer removed'}];
                    }
                }

				// Return the error header
                return [header, {error: 'beer not found'}];
			}

			// Return the error header
			return [header, {error:'Error in beer removing'}];
		}


		// Function for index beers API
		function indexRespond(method, url, data, headers, params) {
			debugger;
			console.log(beers);
			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

				// Return the success header
                return [header, beers];
			}

			// Return the error header
			return [header, {error:'Error while listing beers'}];
		}


		// Function for show beers API
		function showRespond(method, url, data, headers, params) {
			debugger
            // Get the id param from url
            var id = url.split("/").pop();

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

                // Get beer by id from beer's array
                for(var i = 0; i <= beers.length - 1; i++) {

                    // If beer exists
                    if(beers[i].id == id) {

                        // Return the success header
                        return [header, beers[i]];
                    }
                }

                // Return the error header
    			return [header, {error:'beer not found'}];
			}

			// Return the error header
			return [header, {error:'Error showing beer'}];
		}


		// Function for store beers API
		function storeRespond(method, url, data, headers, params) {

			// Get a random header
			var header = randomHeader();

            // If the result will be 200, execute the operation
			if(header == 200) {
				data = JSON.parse(data);
                // Assisgn beer id - override if inserted
                data.id = beers.length;

                // Insert the new beer
                beers.push( data);

                // Return the success header
                return [header, data];
            }

			// Return the error header
			return [header, {error:'Error storing the beer'}];
		}


		// Function for update beers API
		function updateRespond(method, url, data, headers, params) {
			debugger
            // Get the id param from url
            var id = url.split("/").pop();

			// Get a random header
			var header = randomHeader();

			// If the result will be 200, execute the operation
			if(header == 200) {

                // Get beer by id from beer's array
                for(var i = 0; i <= beers.length - 1; i++) {

                    // If beer exists
                    if(beers[i].id == id.toString()) {

                        // Override the beer
                        beers[i] = JSON.parse(data) ;

                        // Return the success header
                        return [header, beers[1]];
                    }
                }

                // Return the error header
    			return [header, {error:'beer not found'}];
			}

			// Return the error header
			return [header, {error:'Error updating beer'}];
		}


		// Basic algorithm for random headers
		function randomHeader(){

			// Generate a random number from 1 to 10
			var random = Math.floor((Math.random() * 10) + 1);

			// Return 500 if random is 10
			if(random == 10) {

				return 500;
			}

			// Return 404 if random is 9
			if(random == 9) {

				return 404;
			}

			// Return 200
			return 200;
		}


		// Function that pass the array that will create the httpBackend
	    function getMocks() {
			 var beerBase = 'http://localhost:9000/beerhouse/beers/';
	    	// Object to pass for fake API
			return [{

				label: 'destroy',
			    method: 'DELETE',
			    url: /beers\/(d*)/,
			    params: ['id'],
			    respond: destroyRespond

			},{

				label: 'index',
			    method: 'GET',
			    url: /beers\/$/,
			    respond: indexRespond

			},{

				label: 'show',
			    method: 'GET',
			    url: /beers\/(d*)/,
			    params: ['id'],
			    respond: showRespond

			},{

				label: 'store',
			    method: 'POST',
			    url: /\/beers/,
			    respond: storeRespond

			},{

				label: 'update',
			    method: 'PUT',
			    url: /\/beers\/(d*)/,
			    params: ['id'],
			    respond: updateRespond
			}];
		}


		// Function for set the array
		function setbeers() {
			
            beers = [
				{  
					alcoholContent:"2.50%",
					category:"econômica",
					id:1,
					ingredients:"pilsen",
					name:"Brahma2",   
					price:56.4
				}
			];
			console.log("beers");
		}
	}

})();

(function() {

  'use strict';

    // Pass the beersRoute to the app
	angular
	    .module('craftbeerweb')
	    .run(beersRoute);


	// Define the beersRoute
    function beersRoute(routerHelper) {


        // Inject with ng-annotate
        "ngInject";


    	// Intercept all the states and add them to the routing
    	routerHelper.configureStates(getStates());
    }


    // Define the getStates
    function getStates() {

		return [{

		    state: 'beers-index',
		    config: {
		        url: '/beers',
		        templateUrl: 'app/modules/beers/index/beers.index.html',
		        controller: 'beersIndexCtrl',
		        controllerAs: 'beersIndex'
		    }
		}, {
		    state: 'beers-store',
		    config: {
		        url: '/beers/store',
		        templateUrl: 'app/modules/beers/store/beers.store.html',
		        controller: 'beersStoreCtrl',
		        controllerAs: 'beersStore'
		    }
		}, {
		    state: 'beers-show',
		    config: {
		        url: '/beers/:id',
		        templateUrl: 'app/modules/beers/show/beers.show.html',
		        controller: 'beersShowCtrl',
		        controllerAs: 'beersShow'
		    }
		}, {
		    state: 'beers-update',
		    config: {
		        url: '/beers/:id/update',
		        templateUrl: 'app/modules/beers/update/beers.update.html',
		        controller: 'beersUpdateCtrl',
		        controllerAs: 'beersUpdate'
		    }
		}, {
		    state: 'beers-destroy',
		    config: {
		        url: '/beers/:id/delete',
		        templateUrl: 'app/modules/beers/destroy/beers.destroy.html',
		        controller: 'beersDestroyCtrl',
		        controllerAs: 'beersDestroy'
		    }
		}];
	}

})();

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
                
            };

        }
    }

})();

(function() {

  'use strict';

    // Pass the staticsRoute to the app
	angular
	    .module('craftbeerweb')
	    .run(staticsRoute);


	// Define the staticsRoute
    function staticsRoute(routerHelper) {


		// Inject with ng-annotate
		"ngInject";


    	// Intercept all the states and add them to the routing
    	routerHelper.configureStates(getStates());
    }


    // Define the getStates
    function getStates() {

		return [{

		    state: 'statics-home',
		    config: {
		        url: '/',
		        templateUrl: 'app/modules/statics/home/statics.home.html',
		        controller: 'staticsHomeCtrl',
		        controllerAs: 'staticsHome'
		    }
		}];
	}

})();

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

(function(){

	'use strict';

	// Pass the mockHelperProvider to the app
	angular
		.module('core.mocking')
		.provider('mockHelper', mockHelperProvider);


    // Define the mockHelperProvider
	function mockHelperProvider() {


		// Holds the service factory function
		this.$get = MockHelper;


		// Define the mockHelperProvider
		function MockHelper($httpBackend) {


			// Inject with ng-annotate
			"ngInject";


			// Pass through this extension
			$httpBackend.whenGET(/\.html$/).passThrough();
			$httpBackend.whenGET(/\.png$/).passThrough();
			$httpBackend.whenGET(/\.svg$/).passThrough();
			$httpBackend.whenGET(/\.jpg$/).passThrough();
			$httpBackend.whenGET(/\.jpeg$/).passThrough();
			$httpBackend.whenGET(/\.css$/).passThrough();
			$httpBackend.whenGET(/beers/).passThrough();
			$httpBackend.whenPOST(/beers/).passThrough();
			$httpBackend.whenPUT(/beers/).passThrough();
			$httpBackend.whenDELETE(/beers/).passThrough();


			// Define the object to return
			var service = {

				configureMocks: configureMocks,		// Configure all the states for the route
			};


			// Return the object
			return service;


	        /*
	        |--------------------------------------------------------------------------
	        | Functions
	        |--------------------------------------------------------------------------
	        |
	        | Declaring all functions used in the MockHelper
	        |
	        */


			// Configure all the mocks for the route
			function configureMocks(mocks) {

				// Foreach mocks, create a fake backend interaction
				mocks.forEach(function(mock){

					$httpBackend.when(mock.method, mock.url).respond(mock.respond);
				});
			}
		}
	}

})();

(function(){

	'use strict';

	// Pass the routerHelperProvider to the app
	angular
		.module('core.routing')
		.provider('routerHelper', routerHelperProvider);


    // Define the routerHelperProvider
	function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {


		// Inject with ng-annotate
		"ngInject";


		// Holds the service factory function
		this.$get = RouterHelper;


		// Declare html5Mode true for a clean url
		$locationProvider.html5Mode(true);


		// Declare strict to false for remove trailing slash
		$urlMatcherFactoryProvider.strictMode(false);


		// Declare the otherwise, go here if no state is found
		$urlRouterProvider.otherwise('/404');


		// Define the routerHelperProvider
		function RouterHelper($state) {


			// Define the object to return
			var service = {

				configureStates: configureStates,			// Configure all the states for the route
				getStates: getStates 						// Return the lists of states

			};


			// Return the object
			return service;


	        /*
	        |--------------------------------------------------------------------------
	        | Functions
	        |--------------------------------------------------------------------------
	        |
	        | Declaring all functions used in the RouterHelper
	        |
	        */


			// Configure all the states for the route
			function configureStates(states) {

				// Add to the routing the state passed trought array of objects
				states.forEach(function(state) {

					$stateProvider.state(state.state, state.config);

				});
			}


			// Return the lists of states
			function getStates() {

				return $state.get();
			}
		}
	}

})();

(function() {

    'use strict';

    // Pass the validatorHelperProvider to the app
    angular
        .module('core.validator')
        .provider('validatorHelper', validatorHelperProvider);


    // Define the validatorHelperProvider
    function validatorHelperProvider(valdrProvider, valdrMessageProvider) {


        // Inject with ng-annotate
        "ngInject";


        // Holds the service factory function
        this.$get = validatorHelper;


        // Define the validatorHelperProvider
        function validatorHelper() {


            valdrMessageProvider.setTemplate('<div class="valdr-message">{{ violation.message }}</div>');

            // Define the object to return
            var service = {

                configureValidators: configureValidators, // Configure all models to validate
            };


            // Return the object
            return service;


            /*
            |--------------------------------------------------------------------------
            | Functions
            |--------------------------------------------------------------------------
            |
            | Declaring all functions used in the ValidatorHelper
            |
            */


            // Configure all the validators for the models
            function configureValidators(validator) {

                valdrProvider.addConstraints(validator);
            }
        }
    }

})();

(function() {

  'use strict';

    // Pass the staticsHomeCtrl to the app
    angular
        .module('craftbeerweb')
        .controller('staticsHomeCtrl', staticsHomeCtrl);


    // Define the staticsHomeCtrl
    function staticsHomeCtrl() {
        "ngInject";       
    }

})();
