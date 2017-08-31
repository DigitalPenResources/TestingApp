app.controller('LoginPageController', function($scope, $state, dataService, studentService, adminService) {

  // $scope.login = function(username) {
  //   console.log(username);
  //   studentService.set(username);
  //   $state.go('report');
  // };

  $scope.login=function () {
    var loginInfo = {
      userid: $scope.email,
      password:$scope.password
    };
    dataService.loginUser('login', loginInfo).then(function (response) {
      console.log(response)
      if (response.data.length < 1) {
        alert("Error: Password or Email incorrect");
      } else if (response.data[0].role==="student") {
        //set student id
        var studentInfo = {
          KEYID: response.data[0].KEYID,
          studentid: response.data[0].studentid
        }
        studentService.set(studentInfo);
        $state.go('report');
      } else if (response.data[0].role==="admin") {
        adminService.set(response.data[0].userid);
        $state.go('studentListAdmin');
      }
    });
  };

});
