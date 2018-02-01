app.controller('ClassTestReportController', function($scope, $state, $http, $httpParamSerializerJQLike, dataService, teacherService, classService) {

  //get userid of teacher
  $scope.teacherID=teacherService.get();
  console.log('$scope.teacherID:', $scope.teacherID);

  //get class
  $scope.class=classService.get();
  console.log('$scope.class:', $scope.class);

  $scope.testArr=[];

  dataService.getTestsForClass('class', {classid: $scope.class.idclass}).then(function (response) {
    // console.log(response)
    response.data.forEach(function (test) {
      //create test arr
      $scope.testArr.push(test);
    });
    console.log($scope.testArr);
    //get student results
    getResults();
  });

  function getResults() {
    //get student answers for each test
    $scope.testArr.forEach(function (test) {
      test.studentList=[];

      //get student answer for specific test
      dataService.getStudentTestAnswers('student', {testid: test.idtest, classid: $scope.class.idclass}).then(function (response) {
        // console.log(response.data);
        $scope.answers=response.data;
        //create an array of unique student names
        $scope.answers.forEach(function (student) {
          if (!test.studentList.includes(student.studentName)) {
            test.studentList.push(student.studentName);
          }
        });
        sortStudents(test);


      });
    });

  }

  function sortStudents(test) {
    // console.log(test)
    test.students=[];
    //create empty student object
    test.studentList.forEach(function (student) {
      test.students.push({studentName:student, studentAnswers:[]});
    });
    //create answer object and assign to student
    $scope.answers.forEach(function (answer) {
      test.students.forEach(function (student) {
        if (answer.studentName===student.studentName) {
          var studentAnsObj={
            // incorrectAnswer: null,
            // correctAnswer: null,
            questionNumber: answer.questionNumber,
            questionAnswer: answer.questionAnswer,
            questionDifficulty: answer.difflevel,
            studentAnswer: answer.StudentAnswer,
            studentDuration: answer.Duration
          };
          student.studentAnswers.push(studentAnsObj);
        }
      });
    });

    //get question summary
    dataService.getQuestionSummary('class',{testid: test.idtest, classid: $scope.class.idclass}).then(function (response) {
      $scope.questions=response.data;
      //assign question summary to first student only
      test.students[0].studentAnswers.forEach(function (studentAnswer) {
        $scope.questions.forEach(function (question) {
          if (studentAnswer.questionNumber===question.questionNumber) {
            studentAnswer.incorrectAnswer=question.incorrectAnswer;
            studentAnswer.correctAnswer=question.correctAnswer;
          }
        });
      });
    });

    //format student name if more than 15 characters to prevent name from 2 lines
    test.students.forEach(function (student) {
      if (student.studentName.length>15) {
        var index=student.studentName.indexOf(' ');  //check index of white space
        if (index<15) {    //long last names
          var formatLastName=student.studentName.substring(0, index+2); //extract first name and first letter of last name
          student.studentName=formatLastName + '.';
        } else { //long first name
          var formatFirstName=student.studentName.substring(0, 12);
          student.studentName=formatFirstName + '...';
        }
      }
    });

    //format table
    var studentCount=test.students.length;
    console.log(studentCount);
    $scope.studentRows=Math.ceil(studentCount/10);
    console.log($scope.studentRows);
  }

  //show/hide detail page
  $scope.showDetailedView=false;
  $scope.detailBtn=false;



});
