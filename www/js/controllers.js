angular.module('starter.controllers', [])

.controller('LocationCtrl', function($scope, $state, $cordovaGeolocation, GeoTools) {

    $scope.$watch('geoData', function(newValue, oldValue){

      if($scope.map===undefined && newValue){
        var mapOptions = {
          center: $scope.geoData.latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      }
    });

    $scope.setCurrentLocation = function(){
      if(!$scope.map) return;
      GeoTools.setLatLngFromMapCenter($scope.map);
    }
/*

*/
  /*
  var options = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var geocoder = new google.maps.Geocoder();

    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      //getAddressLine
      /*var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });
      var infoWindow = new google.maps.InfoWindow({ content: "Here I am!" });
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });

    });



  }, function(error){
    console.log("Could not get location");
  });
  */
})

.controller('ListsCtrl', function($scope, $stateParams, Data) {
  $scope.lists = [
    {id: 'fav', title: 'Favourites'},
    {id: 'todo', title: 'To Do'},
    {id: 'int', title: 'Interests'},
    {id: 'share', title: 'Share'}
  ];

  $scope.places = Data.places.all();
  $scope.tags = Data.tags.all();

  // fill tags line comma separated
  angular.forEach($scope.places, function(place, index){
    console.log(place.tags);
    var res = [];
    angular.forEach(place.tags.slice(0,3), function(tagId){
      res.push(Data.tags.get(tagId).name);
    })
    $scope.places[index].tagsLine = res.join(', ');
  });
})

.controller('DetailsCtrl', function($scope, $stateParams, Data) {
  $scope.place = Data.places.get($stateParams.placeId);

  $scope.tags = [];
  angular.forEach($scope.place.tags, function(tagId) {
    if(tag = Data.tags.get(tagId)) this.push(tag);
  }, $scope.tags);

  $scope.category = Data.categories.get($scope.place.category);

})

.controller('PlusCtrl', function($scope, GeoTools, Data) {
  $scope.photoAdded = false;
  $scope.togglePhotoAdded = function(){
    $scope.photoAdded = !$scope.photoAdded;
  }

  $scope.tags = Data.tags.all().slice(0,6);
})
.controller('RingCtrl', function($scope, $rootScope) {
//  $rootScope.$watch('prec', function(){ $scope.xxx = $rootScope.prec; });
})
.controller('SearchCtrl', function($scope, $rootScope, GeoTools, Data) {
    var _val = 5;
    $scope.prec = {
      val: function(newValue) {
       // Note that _val can be undefined for two reasons:
       // 1. Because it is called as a getter and thus called with no arguments
       // 2. Because the property should actually be set to undefined. This happens e.g. if the
       //    input is invalid
       return arguments.length ? (_val = newValue, $rootScope.prec=_val) : _val;
      }
    };


      $scope.categories = Data.categories.all();
      $scope.categories
      angular.forEach($scope.categories, function(value, key) {
        $scope.categories[key].selected = (['Eat', 'Listen'].indexOf(value.name) > -1);
      });
      $scope.items = [
        {distance: 0.2, name: 'Place Name', addr: 'Address details', category: 'Category', rating: 4.5 },
        {distance: 0.6, name: 'Place Name', addr: 'Address details', category: 'Category', rating: 2 },
        {distance: 0.85, name: 'Place Name', addr: 'Address details', category: 'Category', rating: 4 },
        {distance: 1.2, name: 'Place Name', addr: 'Address details', category: 'Category', rating: 3.5 },
        {distance: 1.6, name: 'Place Name', addr: 'Address details', category: 'Category', rating: 2},
        {distance: 1.8, name: 'Place Name', addr: 'Address details', category: 'Category', rating: 4 },
      ];

})
.controller('IntroCtrl', function($scope) {})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {"a": true, "b": true, "c": false};
})







/*
.controller('CarsCtrl', function($scope, Cars, $http) {
  $scope.cars = Cars.all().then(function(data) {
    $scope.cars = data;
  });
  //$http.get("/data/cars.json").success(function(response){ $scope.cars = response; });
})
.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
*/

;
