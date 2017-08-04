app.controller('LoginPageController', function($scope, $state) {
  console.log('login page controller');

  $scope.login = function() {
    console.log($scope.username);
    console.log($scope.password);
    $state.go('report')
  };

});
