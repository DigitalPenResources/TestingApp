app.config(function($stateProvider) {
  $stateProvider.state('studentList', {
    url: '/studentList',
    views: {
      'headerNav': {
        templateUrl: 'views/headerNav/headerNav.html',
        controller: 'HeaderNavController'
      },
      'pageContent': {
        templateUrl: 'views/studentList/studentList.html',
        controller: 'StudentListController'
      }
    }
  });
});
