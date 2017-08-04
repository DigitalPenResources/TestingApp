app.config(function($stateProvider) {
  $stateProvider.state('loginPage', {
    url: '/',
    views: {
      'headerNav': {
        templateUrl: 'views/headerNav/headerNav.html',
        controller: 'HeaderNavController'
      },
      'pageContent': {
        templateUrl: 'views/loginPage/loginPage.html',
        controller: 'LoginPageController'
      }
    }
  });
});
