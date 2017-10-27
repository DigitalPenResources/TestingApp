app.controller('StudentListAdminController', function($scope, $state, $http, $httpParamSerializerJQLike, adminService, dataService, studentService) {
  //get userid of admin
  $scope.adminID=adminService.get();
  console.log('$scope.adminID:', $scope.adminID);

  //get all student data
  dataService.getAll('student').then(function (response) {
    console.log('all students:', response.data);
    $scope.studentArr=response.data;

    //map total composite score for ACT test
    $scope.studentArr.forEach(function (student) {
      if (student.examname==='ACT') {
        dataService.getStudentTotalScores('student', {studentid: student.studentid, examversion: student.examversion}).then(function (response) {
          student.totalPSATScore=response.data[0].TotalCompositeScore;
        });
      }
    });

    // console.log($scope.studentArr)

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
