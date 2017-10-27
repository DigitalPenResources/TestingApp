app.controller('StudentListAdminController', function($scope, $state, $http, $httpParamSerializerJQLike, adminService, dataService, studentService) {
  //get userid of admin
  $scope.adminID=adminService.get();
  console.log('$scope.adminID:', $scope.adminID);

  //get all student data
  dataService.getAll('student').then(function (response) {
    console.log('all students:', response.data);
    $scope.studentArr=response.data;

    // //find KEYID of logged in student
    // studentArr.forEach(function (student) {
    //   // console.log(student)
    //   if (student.studentid===$scope.studentID) {
    //     $scope.studentKEYID=student.KEYID;
    //     $scope.studentNAME=student.StudentName;
    //   }
    // });
    // console.log('$scope.studentKEYID:', $scope.studentKEYID);
    // console.log('$scope.studentNAME:', $scope.studentNAME);
  });

  $scope.selectStudent = function (student) {
    studentService.set(student);
    if (student.examname==='ACT') {
      $state.go('reportACTAdmin');
    } else {
      $state.go('reportAdmin');
    }
  };
});
