app.service('dataService', function($http, $q, CONSTANTS, $httpParamSerializerJQLike) {
  var base = CONSTANTS.api.baseUrl;
  var path = CONSTANTS.api.path;
  var query = CONSTANTS.api.query;

  var service = {};

  service.get = function(dataType, dataObj) {
    var action = CONSTANTS.api.actions[dataType].get;
    // var deferred = $q.defer();
    return $http({
      url: base + path + query + action,
      method: 'GET',
      params: dataObj,
      paramSerializer: '$httpParamSerializerJQLike'
    });
    // .success (function(data) {
    //   deferred.resolve(data);
    // }).error(function(error) {
    //   deferred.reject();
    // });
    // return deferred.promise;
  };

  service.loginUser = function(dataType, dataObj) {
    var action = CONSTANTS.api.actions[dataType].loginUser;
    // var deferred = $q.defer();
    return $http({
      url: base + path + query + action,
      method: 'GET',
      params: dataObj,
      paramSerializer: '$httpParamSerializerJQLike'
    });
  };

  service.getScoringRange = function (dataType, dataObj) {
    var action = CONSTANTS.api.actions[dataType].getScoringRange;
    // var deferred = $q.defer();
    return $http({
      url: base + path + query + action,
      method: 'GET',
      params: dataObj,
      paramSerializer: '$httpParamSerializerJQLike'
    });
  };

  service.getStudentSectionData = function (dataType, dataObj) {
    var action = CONSTANTS.api.actions[dataType].getStudentSectionData;
    // var deferred = $q.defer();
    return $http({
      url: base + path + query + action,
      method: 'GET',
      params: dataObj,
      paramSerializer: '$httpParamSerializerJQLike'
    });
  }

  service.getStudentTotalScores = function(dataType, dataObj) {
    var action = CONSTANTS.api.actions[dataType].getStudentTotalScores;
    // var deferred = $q.defer();
    return $http({
      url: base + path + query + action,
      method: 'GET',
      params: dataObj,
      paramSerializer: '$httpParamSerializerJQLike'
    });
  };

  service.getStudentSubScores = function(dataType, dataObj) {
    var action = CONSTANTS.api.actions[dataType].getStudentSubScores;
    // var deferred = $q.defer();
    return $http({
      url: base + path + query + action,
      method: 'GET',
      params: dataObj,
      paramSerializer: '$httpParamSerializerJQLike'
    });
  };

  service.getStudentAnswers = function(dataType, dataObj) {
    var action = CONSTANTS.api.actions[dataType].getStudentAnswers;
    // var deferred = $q.defer();
    return $http({
      url: base + path + query + action,
      method: 'GET',
      params: dataObj,
      paramSerializer: '$httpParamSerializerJQLike'
    });
  };

  service.getAll = function(dataType) {
    var action = CONSTANTS.api.actions[dataType].getAll;
    // var deferred = $q.defer();
    // return $http.get(base + path + query + action).success (function(data) {
    //   deferred.resolve(data);
    // }).error(function(error) {
    //   deferred.reject();
    // });
    // return deferred.promise;
    return $http({
      url: base + path + query + action,
      method: 'GET'
    });
  };

  return service;
});
