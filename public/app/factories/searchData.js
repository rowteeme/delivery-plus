myApp.factory('searchData', ['$http', function ($http) {
  return {
    get: function("/search") {
      return $http.get(url);
    }

  };
}]);
