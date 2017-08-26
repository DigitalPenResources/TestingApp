app.factory('adminService', function() {

  function set(data) {
    selectedAdmin = data;
    console.log("set",selectedAdmin);

    // localStorageService.set('selStudent', data);
    // console.log("set",data);
  }

  function get() {
    return selectedAdmin;
    // return localStorageService.get('selStudent');
  }

  return {
    set: set,
    get: get,
  };
});
