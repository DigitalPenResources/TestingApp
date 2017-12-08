app.factory('classService', function() {

  function set(data) {
    selectedClass = data;
    console.log("set",selectedClass);

    // localStorageService.set('selStudent', data);
    // console.log("set",data);
  }

  function get() {
    return selectedClass;
    // return localStorageService.get('selStudent');
  }

  return {
    set: set,
    get: get,
  };
});
