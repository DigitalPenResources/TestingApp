app.controller('ReportController', function($scope, $http, $httpParamSerializerJQLike, studentService, dataService, $filter) {

  //get id of student logged in
  $scope.studentInfo=studentService.get();
  console.log('$scope.studentInfo:', $scope.studentInfo);
  $scope.studentID=$scope.studentInfo.studentid


  // $http({
  //     url: 'http://54.202.41.242/examApp/api.php?x=getStudents',
  //     method: 'GET',
  //     // params: {KEYID: 1},
  //     // paramSerializer: '$httpParamSerializerJQLike',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  // }).then(function(response){
  //   console.log(response);
  // });

  //get all student data
  // dataService.getAll('student').then(function (response) {
  //   console.log('all students:', response.data);
  //   var studentArr=response.data;
  //
  //   //find KEYID of logged in student
  //   studentArr.forEach(function (student) {
  //     // console.log(student)
  //     if (student.studentid===$scope.studentID) {
  //       $scope.studentKEYID=student.KEYID;
  //       $scope.studentNAME=student.StudentName;
  //     }
  //   });
  //   console.log('$scope.studentKEYID:', $scope.studentKEYID);
  //   console.log('$scope.studentNAME:', $scope.studentNAME);
  // });

  //get student info
  dataService.get('student', {KEYID:$scope.studentInfo.KEYID}).then(function (response) {
    console.log(response);
    console.log(response.data[0]);
    $scope.studentNAME=response.data[0].StudentName;
    $scope.studentKEYID=response.data[0].KEYID;
    $scope.studentGrade=response.data[0].grade;
  });

  //get student total scores
  dataService.getStudentTotalScores('student', {studentid: $scope.studentID}).then(function (response) {
    console.log(response.data);
    $scope.totalScores=response.data[0];
    $scope.PSATscoretotalpercentage=(($scope.totalScores.TotalPSATScore-320)/(1520-320))*100;
    $scope.readingscoretotalpercentage=(($scope.totalScores.TotalEvidentScore-160)/(760-160))*100;
    $scope.mathscoretotalpercentage=(($scope.totalScores.TotalMathScore-160)/(760-160))*100;
    $scope.readingTestScoretotalpercentage=(($scope.totalScores.TotalReadingScore-8)/(38-8))*100;
    $scope.writingTestScoretotalpercentage=(($scope.totalScores.TotalWritingScore-8)/(38-8))*100;
    $scope.mathTestScoretotalpercentage=(($scope.totalScores.TotalPassportAdvMath-8)/(38-8))*100;
  });

  //get student sub scores
  dataService.getStudentSubScores('student', {studentid: $scope.studentID}).then(function (response) {
    console.log(response.data);
    $scope.subScores=response.data[0];
    $scope.commandOfEvidencePercentage=(($scope.subScores.TotalCommandOfEvidence-1)/(15-1))*100;
    $scope.contextWordsPercentage=(($scope.subScores.TotalContextWords-1)/(15-1))*100;
    $scope.expressionOfIdeasPercentage=(($scope.subScores.TotalExpressionOfIdeas-1)/(15-1))*100;
    $scope.heartOfAlgebraPercentage=(($scope.subScores.TotalHeartOfAlgebra-1)/(15-1))*100;
    $scope.passportAdvMathPercentage=(($scope.subScores.TotalPassportAdvMath-1)/(15-1))*100;
    $scope.problemSolvingPercentage=(($scope.subScores.TotalProblemSolving-1)/(15-1))*100;
    $scope.standardEngPercentage=(($scope.subScores.TotalStandardEngish-1)/(15-1))*100;
  });

  //get student answers
  dataService.getStudentAnswers('student', {studentid: $scope.studentID, examVersion:1}).then(function (response) {
    console.log(response.data);
    $scope.answers=response.data;

    $scope.readingScoresArr=[];
    $scope.writingLangScoresArr=[];
    $scope.mathCalScoresArr=[];
    $scope.mathNoCalScoresArr=[];

    $scope.answers.forEach(function (answer) {
      if (answer.sectionName==='01') {
        $scope.readingScoresArr.push(answer);
      } else if (answer.sectionName==='02'){
        $scope.writingLangScoresArr.push(answer);
      } else if (answer.sectionName==='03'){
        $scope.mathCalScoresArr.push(answer);
      } else if (answer.sectionName==='04'){
        $scope.mathNoCalScoresArr.push(answer);
      }
    });

    //get scoring range
    dataService.getScoringRange('score', {grade: $scope.studentGrade}).then(function (response) {
      console.log(response);
    });

    //get reading section data
    dataService.getStudentSectionData('student', {studentid: $scope.studentID, sectionName:'01'}).then(function (response) {
      console.log(response);
      $scope.sectionReadingData=response.data[0];
    });

    //get writing section data
    dataService.getStudentSectionData('student', {studentid: $scope.studentID, sectionName:'02'}).then(function (response) {
      console.log(response);
      $scope.sectionWritingData=response.data[0];
    });

    //get math w/ calc section data
    dataService.getStudentSectionData('student', {studentid: $scope.studentID, sectionName:'03'}).then(function (response) {
      console.log(response);
      $scope.sectionMathCalcData=response.data[0];
    });

    //get math no calc section data
    dataService.getStudentSectionData('student', {studentid: $scope.studentID, sectionName:'04'}).then(function (response) {
      console.log(response);
      $scope.sectionMathNoCalcData=response.data[0];
    });

    // $scope.answers.find(function (answer) {
    //   if (answer.sectionName==='01') {
    //     console.log(answer.indexOf())
    //     $scope.readingScoresArr.push(answer);
    //   }
    //   console.log($scope.readingScoresArr)
    // })

    // var readingScoresObj = $scope.answers.filter(function ( readingScoresObj ) {
    //   return readingScoresObj.sectionName === "01";
    // });
    //
    // console.log(readingScoresObj)
    // $scope.readingScores=readingScoresObj
  });



  // $scope.readingscoretotal=380;

  // $scope.readingscores= [
  //   {
  //     QUESTION : "1",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY"
  //   },
  //   {
  //     QUESTION : "2",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "HARD",
  //     SUBSCORE: "COE",
  //     CROSS:"HSS"
  //   },
  //   {
  //     QUESTION : "3",
  //     CORRECT : "B",
  //     ANSWER: "C",
  //     DIFFICULTY: "MEDIUM",
  //     SUBSCORE: "COE, EOI",
  //     CROSS:"HSS"
  //   },
  //   {
  //     QUESTION : "4",
  //     CORRECT : "A",
  //     ANSWER: "B",
  //     DIFFICULTY: "MEDIUM",
  //     SUBSCORE: "WIC",
  //     CROSS:"SCI"
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "",
  //     CROSS:""
  //   },
  // ];
  //
  // $scope.writingscores= [
  //   {
  //     QUESTION : "1",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY"
  //   },
  //   {
  //     QUESTION : "2",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "HARD",
  //     SUBSCORE: "COE",
  //     CROSS:"HSS"
  //   },
  //   {
  //     QUESTION : "3",
  //     CORRECT : "B",
  //     ANSWER: "C",
  //     DIFFICULTY: "MEDIUM",
  //     SUBSCORE: "COE, EOI",
  //     CROSS:"HSS"
  //   },
  //   {
  //     QUESTION : "4",
  //     CORRECT : "A",
  //     ANSWER: "B",
  //     DIFFICULTY: "MEDIUM",
  //     SUBSCORE: "WIC",
  //     CROSS:"SCI"
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  // ];
  //
  // $scope.mathcalscores= [
  //   {
  //     QUESTION : "1",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY"
  //   },
  //   {
  //     QUESTION : "2",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "HARD",
  //     SUBSCORE: "COE",
  //     CROSS:"HSS"
  //   },
  //   {
  //     QUESTION : "3",
  //     CORRECT : "B",
  //     ANSWER: "C",
  //     DIFFICULTY: "MEDIUM",
  //     SUBSCORE: "COE, EOI",
  //     CROSS:"HSS"
  //   },
  //   {
  //     QUESTION : "4",
  //     CORRECT : "A",
  //     ANSWER: "B",
  //     DIFFICULTY: "MEDIUM",
  //     SUBSCORE: "WIC",
  //     CROSS:"SCI"
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  // ];
  //
  // $scope.mathnocalscores= [
  //   {
  //     QUESTION : "1",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY"
  //   },
  //   {
  //     QUESTION : "2",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "HARD",
  //     SUBSCORE: "COE",
  //     CROSS:"HSS"
  //   },
  //   {
  //     QUESTION : "3",
  //     CORRECT : "B",
  //     ANSWER: "C",
  //     DIFFICULTY: "MEDIUM",
  //     SUBSCORE: "COE, EOI",
  //     CROSS:"HSS"
  //   },
  //   {
  //     QUESTION : "4",
  //     CORRECT : "A",
  //     ANSWER: "B",
  //     DIFFICULTY: "MEDIUM",
  //     SUBSCORE: "WIC",
  //     CROSS:"SCI"
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  //   {
  //     QUESTION : "5",
  //     CORRECT : "A",
  //     ANSWER: "A",
  //     DIFFICULTY: "EASY",
  //     SUBSCORE: "SEC",
  //     CROSS:""
  //   },
  // ]

});
