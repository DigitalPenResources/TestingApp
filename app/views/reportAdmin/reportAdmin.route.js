app.config(function($stateProvider) {
  $stateProvider.state('reportAdmin', {
    url: '/reportAdmin',
    views: {
      'headerNav': {
        templateUrl: 'views/headerNav/headerNav.html',
        controller: 'HeaderNavController'
      },
      'pageContent': {
        templateUrl: 'views/reportAdmin/reportAdmin.html',
        controller: 'ReportAdminController'
      }
    }
  });
});
