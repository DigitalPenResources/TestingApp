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
      } else if (answer.sectionName==='04'){
        $scope.mathCalScoresArr.push(answer);
      } else if (answer.sectionName==='03'){
        $scope.mathNoCalScoresArr.push(answer);
      }
    });

    //get scoring range
    dataService.getScoringRange('score', {grade: $scope.studentGrade}).then(function (response) {
      console.log(response);
      $scope.scoreRange=response.data[0];
      //calculate reading & writing section range percentage
      $scope.readingwritingsectionredpercentage=($scope.scoreRange.readingwritingsectionredmax - $scope.scoreRange.readingwritingsectionredmin)/($scope.scoreRange.readingwritingsectiongreenmax - $scope.scoreRange.readingwritingsectionredmin) * 100;
      $scope.readingwritingsectionyellowpercentage=($scope.scoreRange.readingwritingsectionyellowmax - $scope.scoreRange.readingwritingsectionredmax)/($scope.scoreRange.readingwritingsectiongreenmax - $scope.scoreRange.readingwritingsectionredmin) * 100;
      $scope.readingwritingsectiongreenpercentage=($scope.scoreRange.readingwritingsectiongreenmax - $scope.scoreRange.readingwritingsectionyellowmax)/($scope.scoreRange.readingwritingsectiongreenmax - $scope.scoreRange.readingwritingsectionredmin) * 100;
      //calculate math section range percentage
      $scope.mathsectionredpercentage=($scope.scoreRange.mathsectionredmax - $scope.scoreRange.mathsectionredmin)/($scope.scoreRange.mathsectiongreenmax - $scope.scoreRange.mathsectionredmin) * 100;
      $scope.mathsectionyellowpercentage=($scope.scoreRange.mathsectionyellowmax - $scope.scoreRange.mathsectionredmax)/($scope.scoreRange.mathsectiongreenmax - $scope.scoreRange.mathsectionredmin) * 100;
      $scope.mathsectiongreenpercentage=($scope.scoreRange.mathsectiongreenmax - $scope.scoreRange.mathsectionyellowmax)/($scope.scoreRange.mathsectiongreenmax - $scope.scoreRange.mathsectionredmin) * 100;
      //calculate test score reading section range percentage
      $scope.readingtestredpercentage=($scope.scoreRange.readingtestredmax - $scope.scoreRange.readingtestredmin)/($scope.scoreRange.readingtestgreenmax - $scope.scoreRange.readingtestredmin) * 100;
      $scope.readingtestyellowpercentage=($scope.scoreRange.readingtestyellowmax - $scope.scoreRange.readingtestredmax)/($scope.scoreRange.readingtestgreenmax - $scope.scoreRange.readingtestredmin) * 100;
      $scope.readingtestgreenpercentage=($scope.scoreRange.readingtestgreenmax - $scope.scoreRange.readingtestyellowmax)/($scope.scoreRange.readingtestgreenmax - $scope.scoreRange.readingtestredmin) * 100;
      //calculate test score writing section range percentage
      $scope.writingtestredpercentage=($scope.scoreRange.writingtestredmax - $scope.scoreRange.writingtestredmin)/($scope.scoreRange.writingtestgreenmax - $scope.scoreRange.writingtestredmin) * 100;
      $scope.writingtestyellowpercentage=($scope.scoreRange.writingtestyellowmax - $scope.scoreRange.writingtestredmax)/($scope.scoreRange.writingtestgreenmax - $scope.scoreRange.writingtestredmin) * 100;
      $scope.writingtestgreenpercentage=($scope.scoreRange.writingtestgreenmax - $scope.scoreRange.writingtestyellowmax)/($scope.scoreRange.writingtestgreenmax - $scope.scoreRange.writingtestredmin) * 100;
      //calculate test score math calculator range percentage
      $scope.mathtestredpercentage=($scope.scoreRange.mathtestredmax - $scope.scoreRange.mathtestredmin)/($scope.scoreRange.mathtestgreenmax - $scope.scoreRange.mathtestredmin) * 100;
      $scope.mathtestyellowpercentage=($scope.scoreRange.mathtestyellowmax - $scope.scoreRange.mathtestredmax)/($scope.scoreRange.mathtestgreenmax - $scope.scoreRange.mathtestredmin) * 100;
      $scope.mathtestgreenpercentage=($scope.scoreRange.mathtestgreenmax - $scope.scoreRange.mathtestyellowmax)/($scope.scoreRange.mathtestgreenmax - $scope.scoreRange.mathtestredmin) * 100;
      //calculate sub score commande of evidence calculator range percentage
      $scope.commandofevidenceredpercentage=($scope.scoreRange.commandofevidenceredmax - $scope.scoreRange.commandofevidenceredmin)/($scope.scoreRange.commandofevidencegreenmax - $scope.scoreRange.commandofevidenceredmin) * 100;
      $scope.commandofevidenceyellowpercentage=($scope.scoreRange.commandofevidenceyellowmax - $scope.scoreRange.commandofevidenceredmax)/($scope.scoreRange.commandofevidencegreenmax - $scope.scoreRange.commandofevidenceredmin) * 100;
      $scope.commandofevidencegreenpercentage=($scope.scoreRange.commandofevidencegreenmax - $scope.scoreRange.commandofevidenceyellowmax)/($scope.scoreRange.commandofevidencegreenmax - $scope.scoreRange.commandofevidenceredmin) * 100;
      //calculate sub score words in context calculator range percentage
      $scope.wordsincontextredpercentage=($scope.scoreRange.wordsincontextredmax - $scope.scoreRange.wordsincontextredmin)/($scope.scoreRange.wordsincontextgreenmax - $scope.scoreRange.wordsincontextredmin) * 100;
      $scope.wordsincontextyellowpercentage=($scope.scoreRange.wordsincontextyellowmax - $scope.scoreRange.wordsincontextredmax)/($scope.scoreRange.wordsincontextgreenmax - $scope.scoreRange.wordsincontextredmin) * 100;
      $scope.wordsincontextgreenpercentage=($scope.scoreRange.wordsincontextgreenmax - $scope.scoreRange.wordsincontextyellowmax)/($scope.scoreRange.wordsincontextgreenmax - $scope.scoreRange.wordsincontextredmin) * 100;
      //calculate sub score expression of ideas calculator range percentage
      $scope.expressionofideasredpercentage=($scope.scoreRange.expressionofideasredmax - $scope.scoreRange.expressionofideasredmin)/($scope.scoreRange.expressionofideasgreenmax - $scope.scoreRange.expressionofideasredmin) * 100;
      $scope.expressionofideasyellowpercentage=($scope.scoreRange.expressionofideasyellowmax - $scope.scoreRange.expressionofideasredmax)/($scope.scoreRange.expressionofideasgreenmax - $scope.scoreRange.expressionofideasredmin) * 100;
      $scope.expressionofideasgreenpercentage=($scope.scoreRange.expressionofideasgreenmax - $scope.scoreRange.expressionofideasyellowmax)/($scope.scoreRange.expressionofideasgreenmax - $scope.scoreRange.expressionofideasredmin) * 100;
      //calculate sub score english conventions calculator range percentage
      $scope.englishconventionsredpercentage=($scope.scoreRange.englishconventionsredmax - $scope.scoreRange.englishconventionsredmin)/($scope.scoreRange.englishconventionsgreenmax - $scope.scoreRange.englishconventionsredmin) * 100;
      $scope.englishconventionsyellowpercentage=($scope.scoreRange.englishconventionsyellowmax - $scope.scoreRange.englishconventionsredmax)/($scope.scoreRange.englishconventionsgreenmax - $scope.scoreRange.englishconventionsredmin) * 100;
      $scope.englishconventionsgreenpercentage=($scope.scoreRange.englishconventionsgreenmax - $scope.scoreRange.englishconventionsyellowmax)/($scope.scoreRange.englishconventionsgreenmax - $scope.scoreRange.englishconventionsredmin) * 100;
      //calculate sub score algebra calculator range percentage
      $scope.algebraredpercentage=($scope.scoreRange.algebraredmax - $scope.scoreRange.algebraredmin)/($scope.scoreRange.algebragreenmax - $scope.scoreRange.algebraredmin) * 100;
      $scope.algebrayellowpercentage=($scope.scoreRange.algebrayellowmax - $scope.scoreRange.algebraredmax)/($scope.scoreRange.algebragreenmax - $scope.scoreRange.algebraredmin) * 100;
      $scope.algebragreenpercentage=($scope.scoreRange.algebragreenmax - $scope.scoreRange.algebrayellowmax)/($scope.scoreRange.algebragreenmax - $scope.scoreRange.algebraredmin) * 100;
      //calculate sub score problem solving calculator range percentage
      $scope.problemsolvingredpercentage=($scope.scoreRange.problemsolvingredmax - $scope.scoreRange.problemsolvingredmin)/($scope.scoreRange.problemsolvinggreenmax - $scope.scoreRange.problemsolvingredmin) * 100;
      $scope.problemsolvingyellowpercentage=($scope.scoreRange.problemsolvingyellowmax - $scope.scoreRange.problemsolvingredmax)/($scope.scoreRange.problemsolvinggreenmax - $scope.scoreRange.problemsolvingredmin) * 100;
      $scope.problemsolvinggreenpercentage=($scope.scoreRange.problemsolvinggreenmax - $scope.scoreRange.problemsolvingyellowmax)/($scope.scoreRange.problemsolvinggreenmax - $scope.scoreRange.problemsolvingredmin) * 100;
      //calculate sub score advanced math calculator range percentage
      $scope.advancedmathredpercentage=($scope.scoreRange.advancedmathredmax - $scope.scoreRange.advancedmathredmin)/($scope.scoreRange.advancedmathgreenmax - $scope.scoreRange.advancedmathredmin) * 100;
      $scope.advancedmathyellowpercentage=($scope.scoreRange.advancedmathyellowmax - $scope.scoreRange.advancedmathredmax)/($scope.scoreRange.advancedmathgreenmax - $scope.scoreRange.advancedmathredmin) * 100;
      $scope.advancedmathgreenpercentage=($scope.scoreRange.advancedmathgreenmax - $scope.scoreRange.advancedmathyellowmax)/($scope.scoreRange.advancedmathgreenmax - $scope.scoreRange.advancedmathredmin) * 100;



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
    dataService.getStudentSectionData('student', {studentid: $scope.studentID, sectionName:'04'}).then(function (response) {
      console.log(response);
      $scope.sectionMathCalcData=response.data[0];
    });

    //get math no calc section data
    dataService.getStudentSectionData('student', {studentid: $scope.studentID, sectionName:'03'}).then(function (response) {
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
