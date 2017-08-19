app.factory('studentService', function() {

  function set(data) {
    selectedStudent = data;
    console.log("set",selectedStudent);

    // localStorageService.set('selStudent', data);
    // console.log("set",data);
  }

  function get() {
    return selectedStudent;
    // return localStorageService.get('selStudent');
  }

  return {
    set: set,
    get: get,
  };
});
