define(['angular', 'angular-foundation'], function (angular) {
  var info = angular.module('info', ['mm.foundation']);

  info.service('alert', function ($modal, $log) {
    this.error = (msg) => {
      $log.error(msg);
      $modal.open({
        template: msg,
        windowClass: 'error-message'
      });
    };
  });

  info.factory('prompt', ($window) => $window.prompt);
});
