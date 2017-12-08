app.config(function($stateProvider) {
  $stateProvider.state('classTestReport', {
    url: '/classTestReport',
    views: {
      'headerNav': {
        templateUrl: 'views/headerNav/headerNav.html',
        controller: 'HeaderNavController'
      },
      'pageContent': {
        templateUrl: 'views/classTestReport/classTestReport.html',
        controller: 'ClassTestReportController'
      }
    }
  });
});
