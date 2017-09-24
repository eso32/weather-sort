'use strict';

/**
 * @ngdoc directive
 * @name openweatherApp.directive:showData
 * @description
 * # showData
 */
angular.module('openweatherApp')
  .directive('showData', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.on('click', function(){
          console.log(element.prop('checked'));
          var divCity = element.parent().parent();
          var arr = divCity.children();
          arr.splice(0, 2);

          if(!element.prop('checked')){
            for(var i=0; i<3; i++){
                angular.element(arr[i]).css("display", "none");
            }
          } else {
            for(var i=0; i<3; i++){
                angular.element(arr[i]).css("display", "inline-block");
            }
          }
        });
      }
    };
  });
