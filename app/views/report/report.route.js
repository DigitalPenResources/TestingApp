app.config(function($stateProvider) {
  $stateProvider.state('report', {
    url: '/report',
    views: {
      'headerNav': {
        templateUrl: 'views/headerNav/headerNav.html',
        controller: 'HeaderNavController'
      },
      'pageContent': {
        templateUrl: 'views/report/report.html',
        controller: 'ReportController'
      }
    }
  });
});
