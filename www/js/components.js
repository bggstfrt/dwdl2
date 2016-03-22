angular.module('starter.components', [])

  // Generates simple stars widget *****
  // Example <div rating-stars value="4.5"></div>
  .directive('ratingStars', function($compile) {
    return {
    //  template: '<div class="rating-stars"></div>',
      link: function (scope, element, attrs) {
          var content = '',
              rating = attrs.value || 0;
          for(var i=1; i<=5; i++){
            if(rating >= i){ // full star
              content += '<span class="icon ion-ios-star"></span>';
            }else if(rating >= (i-0.7) && rating <= (i-0.2) ){ // half star
              content += '<span class="icon ion-ios-star-half"></span>';
            }else{ // empty star
              content += '<span class="icon ion-ios-star-outline"></span>';
            }
          }
          var tmpl = '<div class="rating-stars" title="' + rating + '">' + content  +'</div>';
          var newElement = angular.element(tmpl)
          $compile(newElement)(scope)
          element.replaceWith(newElement)
       }


    };
  })
