app.controller('ClassTestReportController', function($scope, $http, $httpParamSerializerJQLike, dataService, teacherService, classService) {

  //get userid of teacher
  $scope.teacherID=teacherService.get();
  console.log('$scope.teacherID:', $scope.teacherID);

  //get class
  $scope.class=classService.get();
  console.log('$scope.class:', $scope.class);

  $scope.testArr=[];

  dataService.getTestsForClass('class', {classid: $scope.class.idclass}).then(function (response) {
    response.data.forEach(function (test) {
      //create test arr
      $scope.testArr.push(test);
    });
    console.log($scope.testArr)
    //get student results
    getResults();
  });

  function getResults() {
    //get student answers for each test
    $scope.testArr.forEach(function (test) {
      test.studentList=[];
      //get student answer for specific test
      dataService.getStudentTestAnswers('student', {testid: test.idtest, classid: $scope.class.idclass}).then(function (response) {
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
    console.log(test);
  }



  // dataService.getStudentTestAnswers('class', {testid: $scope.classid: $scope.class.idclass} )
  // $scope.testArr=[
  //   {
  //     testname: 'test1',
  //     testsection: 'section1',
  //     testquestions: '1-10',
  //     students: [
  //       {
  //         studentName: 'Bob',
  //         studentAnswers: [
  //           {
  //             questionNumber: 'Q1',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '4.0'
  //           },
  //           {
  //             questionNumber: 'Q2',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Easy',
  //             studentAnswer: 'B',
  //             studentDuration: '2.0'
  //           },
  //           {
  //             questionNumber: 'Q3',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Medium',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //           {
  //             questionNumber: 'Q4',
  //             questionAnswer: 'C',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q5',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //         ]
  //       },
  //       {
  //         studentName: 'Tom',
  //         studentAnswers: [
  //           {
  //             questionNumber: 'Q1',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'C',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q2',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Easy',
  //             studentAnswer: 'C',
  //             studentDuration: '2.0'
  //           },
  //           {
  //             questionNumber: 'Q3',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Medium',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //           {
  //             questionNumber: 'Q4',
  //             studentAnswer: 'B',
  //             questionAnswer: 'C',
  //             questionDifficulty:'Hard',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q5',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //         ]
  //       },
  //       {
  //         studentName: 'Jill',
  //         studentAnswers: [
  //           {
  //             questionNumber: 'Q1',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'C',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q2',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Easy',
  //             studentAnswer: 'C',
  //             studentDuration: '2.0'
  //           },
  //           {
  //             questionNumber: 'Q3',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Medium',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //           {
  //             questionNumber: 'Q4',
  //             questionAnswer: 'C',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q5',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //         ]
  //       },
  //       {
  //         studentName: 'Bob',
  //         studentAnswers: [
  //           {
  //             questionNumber: 'Q1',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'C',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q2',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Easy',
  //             studentAnswer: 'C',
  //             studentDuration: '2.0'
  //           },
  //           {
  //             questionNumber: 'Q3',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Medium',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //           {
  //             questionNumber: 'Q4',
  //             questionAnswer: 'C',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q5',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //         ]
  //       },
  //       {
  //         studentName: 'Dave',
  //         studentAnswers: [
  //           {
  //             questionNumber: 'Q1',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'C',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q2',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Easy',
  //             studentAnswer: 'C',
  //             studentDuration: '2.0'
  //           },
  //           {
  //             questionNumber: 'Q3',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Medium',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //           {
  //             questionNumber: 'Q4',
  //             questionAnswer: 'C',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q5',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     testname: 'test1',
  //     testsection: 'section1',
  //     testquestions: '1-10',
  //     students: [
  //       {
  //         studentName: 'Bob',
  //         studentAnswers: [
  //           {
  //             questionNumber: 'Q1',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '4.0'
  //           },
  //           {
  //             questionNumber: 'Q2',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Easy',
  //             studentAnswer: 'B',
  //             studentDuration: '2.0'
  //           },
  //           {
  //             questionNumber: 'Q3',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Medium',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //           {
  //             questionNumber: 'Q4',
  //             questionAnswer: 'C',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q5',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //         ]
  //       },
  //       {
  //         studentName: 'Tom',
  //         studentAnswers: [
  //           {
  //             questionNumber: 'Q1',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'C',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q2',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Easy',
  //             studentAnswer: 'C',
  //             studentDuration: '2.0'
  //           },
  //           {
  //             questionNumber: 'Q3',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Medium',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //           {
  //             questionNumber: 'Q4',
  //             studentAnswer: 'B',
  //             questionAnswer: 'C',
  //             questionDifficulty:'Hard',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q5',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //         ]
  //       },
  //       {
  //         studentName: 'Jill',
  //         studentAnswers: [
  //           {
  //             questionNumber: 'Q1',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'C',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q2',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Easy',
  //             studentAnswer: 'C',
  //             studentDuration: '2.0'
  //           },
  //           {
  //             questionNumber: 'Q3',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Medium',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //           {
  //             questionNumber: 'Q4',
  //             questionAnswer: 'C',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q5',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //         ]
  //       },
  //       {
  //         studentName: 'Bob',
  //         studentAnswers: [
  //           {
  //             questionNumber: 'Q1',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'C',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q2',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Easy',
  //             studentAnswer: 'C',
  //             studentDuration: '2.0'
  //           },
  //           {
  //             questionNumber: 'Q3',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Medium',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //           {
  //             questionNumber: 'Q4',
  //             questionAnswer: 'C',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q5',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //         ]
  //       },
  //       {
  //         studentName: 'Dave',
  //         studentAnswers: [
  //           {
  //             questionNumber: 'Q1',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'C',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q2',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Easy',
  //             studentAnswer: 'C',
  //             studentDuration: '2.0'
  //           },
  //           {
  //             questionNumber: 'Q3',
  //             questionAnswer: 'B',
  //             questionDifficulty:'Medium',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //           {
  //             questionNumber: 'Q4',
  //             questionAnswer: 'C',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '3.0'
  //           },
  //           {
  //             questionNumber: 'Q5',
  //             questionAnswer: 'A',
  //             questionDifficulty:'Hard',
  //             studentAnswer: 'B',
  //             studentDuration: '9.0'
  //           },
  //         ]
  //       }
  //     ]
  //   }
  // ]
});
