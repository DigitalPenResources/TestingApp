app.controller('ReportController', function($scope, $http, $httpParamSerializerJQLike) {
  console.log('report controller');

  $http({
      url: 'http://54.202.41.242/examApp/api.php?x=getStudents',
      method: 'GET',
      // params: {KEYID: 1},
      // paramSerializer: '$httpParamSerializerJQLike',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(response){
      console.log(response);
    });


  $scope.readingscoretotal=380;
  $scope.readingscoretotalpercentage=((380-160)/(760-160))*100;

  $scope.readingscores= [
    {
      QUESTION : "1",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY"
    },
    {
      QUESTION : "2",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "HARD",
      SUBSCORE: "COE",
      CROSS:"HSS"
    },
    {
      QUESTION : "3",
      CORRECT : "B",
      ANSWER: "C",
      DIFFICULTY: "MEDIUM",
      SUBSCORE: "COE, EOI",
      CROSS:"HSS"
    },
    {
      QUESTION : "4",
      CORRECT : "A",
      ANSWER: "B",
      DIFFICULTY: "MEDIUM",
      SUBSCORE: "WIC",
      CROSS:"SCI"
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "",
      CROSS:""
    },
  ];

  $scope.writingscores= [
    {
      QUESTION : "1",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY"
    },
    {
      QUESTION : "2",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "HARD",
      SUBSCORE: "COE",
      CROSS:"HSS"
    },
    {
      QUESTION : "3",
      CORRECT : "B",
      ANSWER: "C",
      DIFFICULTY: "MEDIUM",
      SUBSCORE: "COE, EOI",
      CROSS:"HSS"
    },
    {
      QUESTION : "4",
      CORRECT : "A",
      ANSWER: "B",
      DIFFICULTY: "MEDIUM",
      SUBSCORE: "WIC",
      CROSS:"SCI"
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
  ];

  $scope.mathcalscores= [
    {
      QUESTION : "1",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY"
    },
    {
      QUESTION : "2",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "HARD",
      SUBSCORE: "COE",
      CROSS:"HSS"
    },
    {
      QUESTION : "3",
      CORRECT : "B",
      ANSWER: "C",
      DIFFICULTY: "MEDIUM",
      SUBSCORE: "COE, EOI",
      CROSS:"HSS"
    },
    {
      QUESTION : "4",
      CORRECT : "A",
      ANSWER: "B",
      DIFFICULTY: "MEDIUM",
      SUBSCORE: "WIC",
      CROSS:"SCI"
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
  ];

  $scope.mathnocalscores= [
    {
      QUESTION : "1",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY"
    },
    {
      QUESTION : "2",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "HARD",
      SUBSCORE: "COE",
      CROSS:"HSS"
    },
    {
      QUESTION : "3",
      CORRECT : "B",
      ANSWER: "C",
      DIFFICULTY: "MEDIUM",
      SUBSCORE: "COE, EOI",
      CROSS:"HSS"
    },
    {
      QUESTION : "4",
      CORRECT : "A",
      ANSWER: "B",
      DIFFICULTY: "MEDIUM",
      SUBSCORE: "WIC",
      CROSS:"SCI"
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
    {
      QUESTION : "5",
      CORRECT : "A",
      ANSWER: "A",
      DIFFICULTY: "EASY",
      SUBSCORE: "SEC",
      CROSS:""
    },
  ]

});
