app.config(function($stateProvider) {
  $stateProvider.state('reportACTAdmin', {
    url: '/reportACTAdmin',
    views: {
      'headerNav': {
        templateUrl: 'views/headerNav/headerNav.html',
        controller: 'HeaderNavController'
      },
      'pageContent': {
        templateUrl: 'views/reportACTAdmin/reportACTAdmin.html',
        controller: 'ReportACTAdminController'
      }
    }
  });
});
