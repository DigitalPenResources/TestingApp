app.controller('ReportACTAdminController', function($scope, $http, studentService, adminService, dataService, $uibModal) {

  //get userid of admin
  $scope.adminID=adminService.get();

  //get student
  $scope.studentInfo=studentService.get();
  console.log($scope.studentInfo)

  //get student total scores
  dataService.getStudentTotalScores('student', {studentid: $scope.studentInfo.studentid, examversion: $scope.studentInfo.examversion}).then(function (response) {
    console.log(response.data[0]);
    $scope.totalScores=response.data[0];
    $scope.totalMathScore = $scope.totalScores.TotalMathScore;
    $scope.totalScienceScore = $scope.totalScores.TotalScienceScore;
    $scope.totalEnglishScore = $scope.totalScores.TotalEngishScore;
    $scope.totalReadingScore = $scope.totalScores.TotalReadingScore;
    $scope.totalCompositeScore = $scope.totalScores.TotalCompositeScore;
    $scope.totalStemScore = $scope.totalScores.TotalStemScore;
    $scope.totalWritingScore = $scope.totalScores.TotalWritingScore;
    $scope.totalELAScore = $scope.totalScores.TotalELAScore;


    // $scope.mathscoretotalpercentage=(($scope.totalScores.TotalMathScore-1)/(36-1))*100;
    // $scope.sciencescoretotalpercentage=(($scope.totalScores.TotalScienceScore-1)/(36-1))*100;
    // $scope.englishscoretotalpercentage=(($scope.totalScores.TotalEngishScore-1)/(36-1))*100;
    // $scope.readingscoretotalpercentage=(($scope.totalScores.TotalReadingScore-1)/(36-1))*100;
    // $scope.compositescoretotalpercentage=(($scope.totalScores.TotalCompositeScore-1)/(36-1))*100;
    // $scope.stemscoretotalpercentage=(($scope.totalScores.TotalStemScore-1)/(36-1))*100;
    // $scope.writingscoretotalpercentage=(($scope.totalScores.TotalWritingScore-1)/(36-1))*100;
    // $scope.elascoretotalpercentage=(($scope.totalScores.TotalELAScore-1)/(36-1))*100;
  });

  //score range
  $scope.scoreRangeMin=1;
  $scope.scoreRangeMax=36;

  //get student answers
  dataService.getStudentAnswers('student', {studentid: $scope.studentInfo.studentid, examversion: $scope.studentInfo.examversion}).then(function (response) {
    console.log(response.data);
    $scope.answers=response.data;

    $scope.readingScoresArr=[];
    $scope.writingLangScoresArr=[];
    $scope.mathCalScoresArr=[];
    $scope.mathNoCalScoresArr=[];

    $scope.answers.forEach(function (answer) {
      answer.adjustedAnswer="";
      if (answer.sectionName==='01') {
        $scope.readingScoresArr.push(answer);
      } else if (answer.sectionName==='02'){
        $scope.writingLangScoresArr.push(answer);
      } else if (answer.sectionName==='04'){
        $scope.mathCalScoresArr.push(answer);
      } else if (answer.sectionName==='03'){
        $scope.mathNoCalScoresArr.push(answer);
      }
    });
  });

  $scope.answerChanges=[];

  //build array of answer changes
  $scope.changeScore=function (answer) {
    $scope.answerChangesObj={
      idstudent: answer.idstudent,
      questionnumber: answer.questionNumber,
      sectionname: answer.sectionName,
      examversion: answer.examVersion,
      studentanswer: answer.adjustedAnswer
    };
    //check if question has already been changed, if so, update answer, if not, add to array
    var foundIndex = $scope.answerChanges.findIndex(x => x.questionnumber == answer.questionNumber && x.sectionname == answer.sectionName);
    if (foundIndex===-1) {
      $scope.answerChanges.push($scope.answerChangesObj);
    } else {
      if (answer.adjustedAnswer==="") {
        $scope.answerChanges.splice(foundIndex, 1);
      } else {
        $scope.answerChanges[foundIndex].studentanswer = answer.adjustedAnswer;
      }
    }
  };


  //recalculate score
  $scope.calculate=function () {
    //if no changes have been made
    if ($scope.answerChanges.length===0) {
      alert("No changes to the answers have been detected, please change answers before recalculating.");
    } else {
      $scope.recalc=false;
      //if changes have been made, open modal
      console.log($scope.answerChanges);
      var modalInstance = $uibModal.open({
        controller: 'LoadingRecalcController',
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: './views/modals/loadingRecalc/loadingRecalc.html',
        size: 'md',
        backdrop: 'static',
        resolve: {
          answerChanges: function() {
              return $scope.answerChanges;
          },
          reportType: function() {
              return $scope.studentInfo.examname;
          },
        }
      });

      modalInstance.result.then(function (score) {
        console.log(score);
        $scope.projectedScore=score;
        $scope.recalc=true;
      });
    }
  };

  $scope.printToPdf = function() {
    html2canvas($('#print-section-1') , {
      // scale: 2,
      // dpi: 196,
      onrendered: function (canvas) {
      // console.log(canvas)
      var data1 = canvas.toDataURL();
        html2canvas($('#print-section-2'), {
          // dpi: 196,
          // width: 600,
          onrendered: function (canvas) {
            // console.log(canvas)
            var data2 = canvas.toDataURL();
            // console.log(data2)
            var docDefinition = {
              content: [
                {
                  image: data1,
                  width: 560,
                  pageBreak:'after',
                  alignment: 'center',
                  // margin: [5,10,5,10]
                },
                {
                  image: data2,
                  alignment: 'center',
                  width: 530,
                  // height: 700
                  // fit:[612, 792]
                  // margin: [15,0,5,10] //works for psat
                }
              ],
              pageMargins: [15,15,15,15], //works
              pageSize: { width: 612, height: 792 }
              // margin:[400,100,40,50]

            };
            pdfMake.createPdf(docDefinition).download($scope.studentInfo.studentid + ' - ' + $scope.answers[0].examVersion);
          }
        });
       }
     });
   };

   $scope.sectionArr=['Math', 'English', 'Science', 'Reading', 'Composite', 'Stem', 'Writing', 'ELA'];
   $scope.goal=36;

      var calculateBarPercent = function(section) {
        var sectionScore = 'total' + section + 'Score';
       var percent = ($scope[sectionScore] / $scope.goal) * 100;
       if (percent > 100) {
         percent = 100;
       }
       if ($scope[sectionScore] <= 1 ) {
         percent = 0.5;
        }
       return percent;
     };

   $scope.sectionArr.forEach(function (section) {
     var watchSection='total' + section + 'Score';
     $scope.$watch(watchSection, function() {
       var barPercentSection= 'barPercent' + section;
       var barStyleSection='barStyle' + section;

       $scope[barPercentSection] = 100 - calculateBarPercent(section);
       $scope[barStyleSection] = 'transform: translateY(' + $scope[barPercentSection] + '%)';
     });

   });




// //VERTICAL MATH SCALE
//    $scope.infoAboveMath=false;
//    var calculateBarPercentMath = function() {
//     var percent = ($scope.totalMathScore / $scope.goal) * 100;
//     if (percent > 100) {
//       percent = 100;
//     }
//     if (percent < 15) {
//       $scope.infoAboveMath = true;
//     }
//     return percent;
//   };
//
//   $scope.$watch('totalMathScore', function() {
//     $scope.barPercentMath = 100 - calculateBarPercentMath();
//     $scope.barStyleMath = 'transform: translateY(' + $scope.barPercentMath + '%)';
//   });
//
// //VERTICAL SCIENCE SCALE
//
//   $scope.$watch('totalMathScore', function(taco) {
//     $scope.barPercent = 100 - calculateBarPercent(taco);
//     $scope.barStyle = 'transform: translateY(' + $scope.barPercent + '%)';
//   });


});
