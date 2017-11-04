app.controller('LoadingRecalcController', function($scope, $uibModalInstance, answerChanges, dataService) {
  console.log(answerChanges);
  $scope.answerChanges=answerChanges;
  var answersAdded=0;

  //send adjusted answers to back end for calculation
  $scope.answerChanges.forEach(function (changeObj) {
    dataService.insertStudentAnswer('answer', changeObj).then(function (response) {
      console.log(response);
      if (response.data.status==='success') {
        answersAdded++;
        if (answersAdded===$scope.answerChanges.length) {
          console.log('all answers added, getting projected score');
          console.log($scope.answerChanges)
          dataService.getProjectedScore('score', {idstudent: $scope.answerChanges[0].idstudent, examversion: $scope.answerChanges[0].examversion}).then(function (response) {
            console.log(response);
            $scope.projectedScore=response.data[0];
            $scope.complete=true;
          });
        }
      }
    });
  });

  //close modal and pass calculated score back to controller
  $scope.close = function () {
    $uibModalInstance.close($scope.projectedScore);
  };
});
