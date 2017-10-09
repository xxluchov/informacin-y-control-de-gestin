angular.module("informacin_y_control_de_gestin", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","ngMap","informacin_y_control_de_gestin.controllers", "informacin_y_control_de_gestin.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "Informaci&oacute;n y Control de gesti&oacute;n" ;
		$rootScope.appLogo = "data/images/17499210_1026398490827129_3464582225342695465_n.png" ;
		$rootScope.appVersion = "1.0" ;

		$ionicPlatform.ready(function() {
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "informacin_y_control_de_gestin",
				storeName : "informacin_y_control_de_gestin",
				description : "The offline datastore for Informaci&oacute;n y Control de gesti&oacute;n app"
			});



		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("informacin_y_control_de_gestin.dashboard");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})




.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("informacin_y_control_de_gestin",{
		url: "/informacin_y_control_de_gestin",
			abstract: true,
			templateUrl: "templates/informacin_y_control_de_gestin-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("informacin_y_control_de_gestin.about_us", {
		url: "/about_us",
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("informacin_y_control_de_gestin.actividades", {
		url: "/actividades",
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-actividades.html",
						controller: "actividadesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("informacin_y_control_de_gestin.categories", {
		url: "/categories",
		cache:false,
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-categories.html",
						controller: "categoriesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("informacin_y_control_de_gestin.contacto", {
		url: "/contacto",
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-contacto.html",
						controller: "contactoCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("informacin_y_control_de_gestin.dashboard", {
		url: "/dashboard",
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("informacin_y_control_de_gestin.eventos", {
		url: "/eventos",
		cache:false,
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-eventos.html",
						controller: "eventosCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("informacin_y_control_de_gestin.eventos_bookmark", {
		url: "/eventos_bookmark",
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-eventos_bookmark.html",
						controller: "eventos_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("informacin_y_control_de_gestin.eventos_singles", {
		url: "/eventos_singles/:id",
		cache:false,
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-eventos_singles.html",
						controller: "eventos_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("informacin_y_control_de_gestin.faqs", {
		url: "/faqs",
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("informacin_y_control_de_gestin.fotos", {
		url: "/fotos",
		cache:false,
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-fotos.html",
						controller: "fotosCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("informacin_y_control_de_gestin.fotos_singles", {
		url: "/fotos_singles/:id",
		cache:false,
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-fotos_singles.html",
						controller: "fotos_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("informacin_y_control_de_gestin.galerias", {
		url: "/galerias",
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-galerias.html",
						controller: "galeriasCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("informacin_y_control_de_gestin.inicio", {
		url: "/inicio",
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-inicio.html",
						controller: "inicioCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("informacin_y_control_de_gestin.mapa", {
		url: "/mapa",
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-mapa.html",
						controller: "mapaCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("informacin_y_control_de_gestin.post_bookmark", {
		url: "/post_bookmark",
		cache:false,
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-post_bookmark.html",
						controller: "post_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("informacin_y_control_de_gestin.post_singles", {
		url: "/post_singles/:id",
		cache:false,
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-post_singles.html",
						controller: "post_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("informacin_y_control_de_gestin.posts", {
		url: "/posts/:categories",
		cache:false,
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-posts.html",
						controller: "postsCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("informacin_y_control_de_gestin.rate_this_app", {
		url: "/rate_this_app",
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-rate_this_app.html",
						controller: "rate_this_appCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("informacin_y_control_de_gestin.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("informacin_y_control_de_gestin.users", {
		url: "/users",
		cache:false,
		views: {
			"informacin_y_control_de_gestin-side_menus" : {
						templateUrl:"templates/informacin_y_control_de_gestin-users.html",
						controller: "usersCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/informacin_y_control_de_gestin/dashboard");
});
