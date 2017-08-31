app.config(function($stateProvider) {
  $stateProvider.state('studentListAdmin', {
    url: '/studentListAdmin',
    views: {
      'headerNav': {
        templateUrl: 'views/headerNav/headerNav.html',
        controller: 'HeaderNavController'
      },
      'pageContent': {
        templateUrl: 'views/studentListAdmin/studentListAdmin.html',
        controller: 'StudentListAdminController'
      }
    }
  });
});
