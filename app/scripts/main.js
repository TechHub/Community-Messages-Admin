(function(angular) {
  'use strict';

  angular.module('communityMessagesApp', ['firebase'])
    .config(['$locationProvider', function($locationProvider) {
      $locationProvider.html5Mode({
        enabled:true,
        requireBase:false
      });
    }])
    .controller('MainCtrl', ['$scope', '$firebaseArray', '$location',
      function($scope, $firebaseArray, $location) {
        var ref = new Firebase('https://techhub-community.firebaseio.com/messages');

        ref.authWithPassword({
          email: 'it@techhub.com',
          password: $location.search().p
        }, function(error, authData) {
          if (error === null) {
            // user authenticated with Firebase
            console.log('User ID: ' + authData.uid + ', Provider: ' + authData.provider);
          } else {
            console.log('Error authenticating user:', error);
          }
        });

        // create an AngularFire reference to the data
        var sync = $firebaseArray(ref);
        // download the data into a local object
        $scope.data = sync;

        $scope.setImageUrl = function(message) {
          var imageUrl = window.prompt('Please paste the URL of the image');
          if (imageUrl.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
            message.image = imageUrl;
            $scope.data.$save(message);
          } else {
            window.alert('the image url is not valid');
          }

        };
        $scope.clearImageUrl = function(message) {
          message.image = '';
          $scope.data.$save(message);
        };

        // add a new message with timestamp so it's sorted at top of the others and every field is empty
        $scope.addMessage = function() {
          $scope.data.$add({
            'title': '',
            'location': '',
            'text': '',
            'alert': '',
            'image': '',
            'campus': true,
            'oldStreet': true,
            'shoreditch': true,
            'timestamp': new Date(),
            'sticky': false
          });
        };
      }
    ]);

}(angular));
