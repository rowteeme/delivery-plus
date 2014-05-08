var hackApp = angular.module('hackApp', []);

hackApp.controller('SearchCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.prompt = 'What kind of cuisine would you like? (ex: American, Mexican, Chinese)';
    $scope.query = {};
    $scope.queryBy = '$';
    $scope.restaurants = [];
    $scope.ID = '';


    $http({
        method: 'GET',
        url: '//localhost:3000/search'
    })

    .success( function (data, status, headers, config) {
        console.log(data);
        $scope.restaurants = data.merchants;
        $scope.ID = data.merchants.id;
        })
    .error( function(data, status, headers, config) {
        console.log('Error');
    });

    // $http({
    //     method: 'GET',
    //     url: '//localhost:3000/menu/90'
    // })

    // .success ( function (data, status, headers, config) {
    //     // $scope.restaurants.id = data.id;
    //     console.log(data);

    // });

}]);
hackApp.controller('OrderCtrl', ['$scope', function ($scope) {}]);
hackApp.controller('SuggestCtrl', ['$scope', function ($scope) {}]);
