app.config(function($stateProvider) {
  $stateProvider.state('classList', {
    url: '/classList',
    views: {
      'headerNav': {
        templateUrl: 'views/headerNav/headerNav.html',
        controller: 'HeaderNavController'
      },
      'pageContent': {
        templateUrl: 'views/classList/classList.html',
        controller: 'ClassListController'
      }
    }
  });
});
