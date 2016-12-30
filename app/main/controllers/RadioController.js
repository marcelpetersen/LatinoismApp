angular.module('roots.controllers')
.controller('RadioCtrl', function ($scope, $timeout, $interval, $rootScope, $sce, $ionicScrollDelegate, WebAudio, Stream) {

	var radio = null;
	$scope.isPlaying = false;
  $scope.streamUrl = 'http://31.12.65.200/Swing-Latino-Ec?lang=en-US%2cen%3bq%3d0.8:80/'; // Replace this with your own radio stream URL

  $scope.radioOptions = {
    albumArt: 'main/assets/images/cover.png',
    song: ''
  };

  $scope.audioOptions = {
    buffer : true,
    loop : false,
    gain : 1,
    fallback : true,     // Use HTML5 audio fallback
    retryInterval : 1000  // Retry interval if buffering fails
  };

  Stream.getInfo($scope.streamUrl).then(function(data){
    $scope.radioOptions = data;
  });

  // Stream and Counter timers

  var streamTimer = $interval(function() {
    Stream.getInfo($scope.streamUrl).then(function(data){
      console.log(data);
      $scope.radioOptions = data;
    });
  }, 10000);


  var counterTimer = $interval(function(){
    $scope.radioCurrentTime = $scope.radio.offset();
  }, 1000);


  if (radio!==null) {

    $scope.radio = radio;

  } else {

    $scope.isPlaying = false;
    $scope.radio = WebAudio($scope.streamUrl + ';', $scope.audioOptions);
    radio = $scope.radio;

  }

  $scope.startRadio = function(){

    if(!$scope.isPlaying){

      // Let's play it
      $scope.isPlaying = true;
      $scope.radio.play();

    } else {

      // Let's pause it
      $scope.isPlaying = false;
      $scope.radio.pause();

    }

  };

	// Check if is Offline/Online
  $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
    $scope.radio = WebAudio($scope.streamUrl + ';', $scope.audioOptions);
    radio = $scope.radio;
  });

  $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
    $scope.isPlaying = false;
    $scope.radio.stop();
    $scope.radio = null;
  });

  document.addEventListener("pause", onPause, false);

  function onPause(){
    var isAndroid = ( /(android)/i.test(navigator.userAgent) ) ? true : false;
    if(isAndroid){
      $scope.isPlaying = false;
      $scope.radio.stop();
    }
  }
});
