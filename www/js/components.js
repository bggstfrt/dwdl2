angular.module('starter.components', [])

  // Generates simple stars widget *****
  // Example <div rating-stars value="4.5"></div>
  .directive('ratingStars', function() {
    return {
    //  template: '<div class="rating-stars"></div>',
      link: function (scope, element, attrs) {
            var className,
                rating = attrs['value'] || 0;
            scope.stars = [];
            for(var i=1; i<=5; i++){
              className = 'ion-ios-star-outline'; // default value is empty star
              if (rating >= i){ // full star
                className = 'ion-ios-star';
              }else if(rating >= (i-0.7) && rating <= (i-0.2)){ // half-filled star
                className = 'ion-ios-star-half';
              }
              scope.stars.push({className:className});
            }
       },
       template: '<div class="rating-stars" title=""><span ng-repeat="star in stars" class="icon {{star.className}}"></span></div>'
    };
  })
