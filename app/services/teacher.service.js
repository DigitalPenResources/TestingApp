app.factory('teacherService', function() {

  function set(data) {
    selectedTeacher = data;
    console.log("set",selectedTeacher);

    // localStorageService.set('selStudent', data);
    // console.log("set",data);
  }

  function get() {
    return selectedTeacher;
    // return localStorageService.get('selStudent');
  }

  return {
    set: set,
    get: get,
  };
});
