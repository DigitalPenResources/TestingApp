app.controller('ClassListController', function($scope, $state, $http, dataService, teacherService, classService) {

  //get all active classes
  dataService.getActiveClasses('class').then(function (response) {
    console.log(response);
    $scope.classArr=response.data;
  });

  //get userid of teacher
  $scope.teacherID=teacherService.get();
  console.log('$scope.teacherID:', $scope.teacherID);

  //select class
  $scope.selectClass = function(teacherclass) {
    classService.set(teacherclass);
    $state.go('classTestReport');
  };
});
