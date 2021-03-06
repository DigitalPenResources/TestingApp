app.constant('CONSTANTS', {
  api: {
    baseUrl: 'http://54.202.41.242/',
    path: 'examApp/api.php',
    query: '?x=',
    actions: {
      student: {
        get: 'getStudent',
        getAll: 'getStudents',
        getStudentTotalScores: 'getStudentTotalScores',
        getStudentSubScores: 'getStudentSubScores',
        getStudentAnswers: 'getStudentAnswers',
        getStudentSectionData: 'getStudentSectionData',
        getStudentTestList: 'getStudentTestList',
        getStudentTestAnswersTest: 'getStudentTestAnswersTest',
        getStudentTestAnswers: 'getStudentTestAnswers'
      },
      login: {
        loginUser: 'loginUser'
      },
      score: {
        getScoringRange: 'getScoringRange',
        getProjectedScore: 'getProjectedScore',
        getProjectedACTScore: 'getProjectedACTScore'
      },
      answer: {
        insertStudentAnswer: 'insertStudentAnswer'
      },
      class: {
        getActiveClasses: 'getActiveClasses',
        getTestsForClass: 'getTestsForClass'
      }
    }
  }
});
