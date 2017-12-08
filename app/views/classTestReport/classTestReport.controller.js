app.controller('ClassTestReportController', function($scope, $http, $httpParamSerializerJQLike, dataService, teacherService, classService) {

  //get userid of teacher
  $scope.teacherID=teacherService.get();
  console.log('$scope.teacherID:', $scope.teacherID);

  //get class
  $scope.class=classService.get();
  console.log('$scope.class:', $scope.class);

  dataService.getTestsForClass('class', {classid: $scope.class.idclass}).then(function (response) {
    console.log(response);
    // $scope.testArr=response.data;
  });

  // dataService.getStudentTestAnswers('class', {testid: $scope.classid: $scope.class.idclass} )
  $scope.testArr=[
    {
      testname: 'test1',
      testsection: 'section1',
      testquestions: '1-10',
      questions: [
        {
          questionNumber: 'Q1',
          questionAnswer: 'B',
          questionDifficulty:'Hard',
        },
        {
          questionNumber: 'Q2',
          questionAnswer: 'C',
          questionDifficulty:'Easy',
        },
        {
          questionNumber: 'Q3',
          questionAnswer: 'D',
          questionDifficulty:'Medium',
        },
        {
          questionNumber: 'Q4',
          questionAnswer: 'C',
          questionDifficulty:'Hard',
        },
        {
          questionNumber: 'Q5',
          questionAnswer: 'A',
          questionDifficulty:'Medium',
        }
      ],
      students: [
        {
          studentName: 'Bob',
          studentAnswers: [
            {
              questionNumber: 'Q1',
              studentAnswer: 'B',
              studentDuration: '4.0'
            },
            {
              questionNumber: 'Q2',
              studentAnswer: 'B',
              studentDuration: '2.0'
            },
            {
              questionNumber: 'Q3',
              studentAnswer: 'B',
              studentDuration: '9.0'
            },
            {
              questionNumber: 'Q4',
              studentAnswer: 'B',
              studentDuration: '3.0'
            },
            {
              questionNumber: 'Q5',
              studentAnswer: 'B',
              studentDuration: '9.0'
            },
          ]
        },
        {
          studentName: 'Tom',
          studentAnswers: [
            {
              questionNumber: 'Q1',
              studentAnswer: 'C',
              studentDuration: '3.0'
            },
            {
              questionNumber: 'Q2',
              studentAnswer: 'C',
              studentDuration: '2.0'
            },
            {
              questionNumber: 'Q3',
              studentAnswer: 'B',
              studentDuration: '9.0'
            },
            {
              questionNumber: 'Q4',
              studentAnswer: 'B',
              studentDuration: '3.0'
            },
            {
              questionNumber: 'Q5',
              studentAnswer: 'B',
              studentDuration: '9.0'
            },
          ]
        },
        {
          studentName: 'Jill',
          studentAnswers: [
            {
              questionNumber: 'Q1',
              studentAnswer: 'C',
              studentDuration: '3.0'
            },
            {
              questionNumber: 'Q2',
              studentAnswer: 'C',
              studentDuration: '2.0'
            },
            {
              questionNumber: 'Q3',
              studentAnswer: 'B',
              studentDuration: '9.0'
            },
            {
              questionNumber: 'Q4',
              studentAnswer: 'B',
              studentDuration: '3.0'
            },
            {
              questionNumber: 'Q5',
              studentAnswer: 'B',
              studentDuration: '9.0'
            },
          ]
        },
        {
          studentName: 'Bob',
          studentAnswers: [
            {
              questionNumber: 'Q1',
              studentAnswer: 'C',
              studentDuration: '3.0'
            },
            {
              questionNumber: 'Q2',
              studentAnswer: 'C',
              studentDuration: '2.0'
            },
            {
              questionNumber: 'Q3',
              studentAnswer: 'B',
              studentDuration: '9.0'
            },
            {
              questionNumber: 'Q4',
              studentAnswer: 'B',
              studentDuration: '3.0'
            },
            {
              questionNumber: 'Q5',
              studentAnswer: 'B',
              studentDuration: '9.0'
            },
          ]
        },
        {
          studentName: 'Dave',
          studentAnswers: [
            {
              questionNumber: 'Q1',
              studentAnswer: 'C',
              studentDuration: '3.0'
            },
            {
              questionNumber: 'Q2',
              studentAnswer: 'C',
              studentDuration: '2.0'
            },
            {
              questionNumber: 'Q3',
              studentAnswer: 'B',
              studentDuration: '9.0'
            },
            {
              questionNumber: 'Q4',
              studentAnswer: 'B',
              studentDuration: '3.0'
            },
            {
              questionNumber: 'Q5',
              studentAnswer: 'B',
              studentDuration: '9.0'
            },
          ]
        }

      ],
      // testQuestions:[
      //   {
      //     questionNumber: 'Q1',
      //     questionAnswer: 'B',
      //     questionDifficulty: 'Hard',
      //     studentAnswers:[
      //       {
      //         studentName: 'Bob',
      //         studentAnswer: 'C'
      //       },
      //       {
      //         studentName: 'Bill',
      //         studentAnswer: 'A'
      //       },
      //       {
      //         studentName: 'Jack',
      //         studentAnswer: 'C'
      //       },
      //     ]
      //   },
      //   {
      //     questionNumber: 'Q2',
      //     questionAnswer: 'C',
      //     questionDifficulty: 'Hard',
      //     studentAnswers:[
      //       {
      //         studentName: 'Jill',
      //         studentAnswer: 'C'
      //       },
      //       {
      //         studentName: 'Smith',
      //         studentAnswer: 'D'
      //       },
      //       {
      //         studentName: 'Sam',
      //         studentAnswer: 'A'
      //       },
      //     ]
      //   },
      // ]
    },
    // {
    //   testname: 'test2',
    //   testsection: 'section4',
    //   testQuestions:[
    //     {
    //       questionNumber: 'Q5',
    //       questionAnswer: 'B',
    //       questionDifficulty: 'Hard',
    //       studentAnswers:[
    //         {
    //           studentName: 'Amy',
    //           studentAnswer: 'C'
    //         },
    //         {
    //           studentName: 'John',
    //           studentAnswer: 'A'
    //         },
    //         {
    //           studentName: 'Chris',
    //           studentAnswer: 'C'
    //         },
    //       ]
    //     },
    //     {
    //       questionNumber: 'Q6',
    //       questionAnswer: 'C',
    //       questionDifficulty: 'Hard',
    //       studentAnswers:[
    //         {
    //           studentName: 'Jill',
    //           studentAnswer: 'C'
    //         },
    //         {
    //           studentName: 'Smith',
    //           studentAnswer: 'D'
    //         },
    //         {
    //           studentName: 'Sam',
    //           studentAnswer: 'A'
    //         },
    //       ]
    //     },
    //   ]
    // }
  ]
});
