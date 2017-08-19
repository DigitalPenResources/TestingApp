app.controller('LoginPageController', function($scope, $state, studentService) {

  $scope.login = function(username) {
    console.log(username);
    studentService.set(username);
    $state.go('report');
  };

});
