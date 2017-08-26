app.controller('ReportAdminController', function($scope, $http, $httpParamSerializerJQLike, adminService) {
  //get userid of admin
  $scope.adminID=adminService.get();
  console.log('$scope.adminID:', $scope.adminID);

});
