app.controller('StudentListController', function($scope, $state, $http, $httpParamSerializerJQLike, adminService, dataService, studentService) {

$scope.studentInfo=studentService.get();
console.log('$scope.studentInfo:', $scope.studentInfo);
$scope.studentID=$scope.studentInfo.studentid

  //get all student data
  dataService.getStudentTestList('student', {studentid: $scope.studentID}).then(function (response) {
    console.log('student test:', response.data);
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
    $state.go('report');
  }
});
