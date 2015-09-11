define(['angular', './sample-module'], function(angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('DashboardsCtrl', ['$scope', '$log', 'PredixAssetService', function($scope, $log, PredixAssetService) {

        PredixAssetService.getAssetsByParentId(null).then(function(initialContext) {
            $scope.initialContexts = initialContext;
        }, function(message) {
            $log.error(message);
        });

        // callback for when the Open button is clicked
        $scope.openContext = function(contextDetails) {

            // need to clean up the context details so it doesn't have the infinite parent/children cycle,
            // which causes problems later (can't interpolate: {{context}} TypeError: Converting circular structure to JSON)
            var newContext = angular.copy(contextDetails);
            newContext.children = [];
            newContext.parent = [];

            $scope.context = newContext;

            $scope.selectedDeck = 'bower_components/px-sample-cards/sample-deck.html';

            $scope.$digest();
        };

        $scope.getChildren = function(parentId, options) {
            return PredixAssetService.getAssetsByParentId(parentId, options);
        };

        $scope.handlers = {
            itemOpenHandler: $scope.openContext,
            getChildren: $scope.getChildren
            // (optional) click handler: itemClickHandler: $scope.clickHandler
        };

    }]);
});
