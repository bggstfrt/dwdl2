angular.module('starter.services', [])

.factory('GeoTools', function($rootScope, $cordovaGeolocation, $q){
  var _latLng,
      _addressLine = 'Loading...',
      geocoder = new google.maps.Geocoder();

  return {
    applyData: function(){
      $rootScope.geoData = {
              'latLng': _latLng,
              'addressLine': _addressLine
            };
      if (!$rootScope.$$phase) $rootScope.$apply()
    },
    init: function(){
      var deferred = $q.defer();
      var self = this;
      var options = {timeout: 10000, enableHighAccuracy: true};

      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        _latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        self.initAddressLine().then(function(){
          self.applyData();
          deferred.resolve(true);
        });
      });
      return deferred.promise;
    },

    setLatLngFromMapCenter: function(map){
      if(!map) return false;
      var self = this;
      _latLng = new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng());
      this.initAddressLine().then(function(){
        self.applyData();
      });
    },

    initAddressLine: function(){
      var deferred = $q.defer();
      geocoder.geocode( {'latLng': _latLng}, function(results, status) {
          if(status == google.maps.GeocoderStatus.OK) {
            if(results[0]) {
              _addressLine = results[0].formatted_address;
            }
            deferred.resolve(_addressLine);
          }else{
            console.log('GMaps geocoder error: ' + status);
            deferred.reject(status);
          }
      });
      return deferred.promise;
    }


  }

})

.factory('Data', function() {
  // Might use a resource here that returns a JSON array

  var CategoriesList = [
    {id: 11, name: "Eat"},
    {id: 21, name: "Drink"},
    {id: 31, name: "Shop"},
    {id: 41, name: "Watch"},
    {id: 51, name: "Listen"},
    {id: 61, name: "Relax"}
  ];

  // Some fake testing data
  var placesList = [
    {
      id: 5,
      name: "New Farm Park",
      img: "img/places/1.jpg",
      rating: 4.5,
      category: 61,
      tags: [113, 114, 115]
    },
    {
      id: 15,
      name: "Place Name A",
      img: "img/places/2.jpg",
      rating: 3.7,
      category: 21,
      tags: [105, 111, 101]
    },
    {
      id: 25,
      name: "Place Name B",
      img: "img/places/3.jpg",
      rating: 4.2,
      category: 21,
      tags: [112, 115, 102, 109]
    }
  ];

  var tagsList =[
    {id: 101, name: 'Pizza', weight: 10},
    {id: 102, name: 'Jazz', weight: 10},
    {id: 103, name: 'Opera', weight: 10},
    {id: 104, name: 'Ice Cream', weight: 10},
    {id: 105, name: 'Steak', weight: 10},
    {id: 106, name: 'Playground', weight: 10},
    {id: 107, name: 'Kids Activities', weight: 10},
    {id: 108, name: 'Sci Fi', weight: 10},
    {id: 109, name: 'Lounge Music', weight: 10},
    {id: 110, name: 'Milkshake', weight: 10},
    {id: 111, name: 'Hamburger', weight: 10},
    {id: 112, name: 'Red Wine', weight: 10},
    {id: 113, name: 'BBQ', weight: 10},
    {id: 114, name: 'Picnic', weight: 10},
    {id: 115, name: 'Live Music', weight: 10}
  ];


  return {
    categories: {
      all: function() {
        return CategoriesList;
      },
      get: function(categoryId) {
        for (var i = 0; i < CategoriesList.length; i++) {
          if (CategoriesList[i].id === parseInt(categoryId)) {
            return CategoriesList[i];
          }
        }
        return null;
      }
    },

    places: {
      all: function() {
        return placesList;
      },
      //remove: function(place) {
      //  places.splice(places.indexOf(place), 1);
      //},
      get: function(placeId) {
        for (var i = 0; i < placesList.length; i++) {
          if (placesList[i].id === parseInt(placeId)) {
            return placesList[i];
          }
        }
        return null;
      }
    },

    tags: {
      all: function() {
        return tagsList;
      },
      get: function(tagId) {
        for (var i = 0; i < tagsList.length; i++) {
          if (tagsList[i].id === parseInt(tagId)) {
            return tagsList[i];
          }
        }
        return null;
      }
    }

  };
})

.filter('formatDistanceValue', function(){
  return function(distance){
        switch (true) {
          case (distance == 0):
            return '0m';
            break;
          case (distance > 0 && distance < 1):
            return distance*1000 + 'm';
            break;
          case (distance >= 1):
            return distance + 'klm';
            break;
        }
        return 'n/a';
      }
  })



      /*
      all: function(){
        $http.get("/data/items.json")
          .success(function(response){
              cars = response;
              deferred.resolve(cars);
          }).error(function(err){
              deferred.reject(err);
          });

          return deferred.promise;
        }
        */

;
