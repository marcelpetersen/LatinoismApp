'use strict';
/*global Parse cordova */
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngStorage',
  'ngAnimate',
  'imgFallback',
  'pascalprecht.translate',
  'pasvaz.bindonce',
  'ionic.rating'
])

// .config(function ($ionicCloudProvider) {
//   $ionicCloudProvider.init({
//     'core': {
//       'app_id': '9e3e7ea8'
//     }
//   });
// })

.run(function ($ionicPlatform, $rootScope, $state, $localStorage, User,
  Pushwoosh, GoogleAnalytics, Config, StatusBar, $cordovaGlobalization,
  $translate, AdMobService) {

  $rootScope.theme = Config.ENV.theme;

  if (!$localStorage.unit) {
    $localStorage.unit = Config.ENV.unit;
  }

  if (!$localStorage.mapType) {
    $localStorage.mapType = Config.ENV.mapType;
  }

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

    if (toState.name === 'walkthrough' && $localStorage.walkthrough && !toParams.force) {
      $state.go('app.categories');
      event.preventDefault();
    }
  });

  Parse.initialize(Config.ENV.parse.appId);
  Parse.serverURL = Config.ENV.parse.serverUrl;

  $ionicPlatform.ready(function () {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if ($localStorage.lang) {
      $translate.use($localStorage.lang);
    } else {
      if (typeof navigator.globalization !== 'undefined') {
        $cordovaGlobalization.getPreferredLanguage().then(function (language) {
          $translate.use((language.value).split('-')[0]);
        }, null);
      }
    }

    AdMobService.prepareInterstitial(
      Config.ENV.admob.interstitialForAndroid,
      Config.ENV.admob.interstitialForiOS);

    StatusBar.init(Config.ENV.statusBarColor);
    GoogleAnalytics.init(Config.ENV.gaTrackingId);

    Pushwoosh.init(Config.ENV.push.appId, Config.ENV.push.googleProjectNumber);
    Pushwoosh.registerDevice()
      .then(function (result) {
        console.log('PushWoosh response on registerDevice: ' + result);
      });

  });
})


.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider,
  $provide, $translateProvider) {

  $translateProvider.translations('en', {
    appTitle: 'Latinoism',
    categoriesTitle: 'Categories',
    placesTitle: 'Places',
    reviewsTitle: 'Reviews',
    profileTitle: 'Profile',
    newPlaceTitle: 'New place',
    mapTitle: 'Map',
    nearmeText: 'Near me',
    chatText: 'Chat Rooms',
    addNewPlaceText: 'Add a place',
    profileText: 'Profile',
    settingsText: 'Settings',
    logoutText: 'Log Out',
    signInViaFacebook: 'Login with Facebook',
    signInText: 'Sign In',
    signUpText: 'Create an Account',
    signUpSubmitText: 'Sign Up',
    signInError: 'Login failed',
    nameText: 'Name',
    emailText: 'Email',
    phoneText: 'Mobile Phone',
    passwordText: 'Password',
    userSinceText: 'User since',
    getDirectionsText: 'Get directions',
    callToText: 'Call to',
    openWebsiteText: 'Open website',
    closeText: 'close',
    okText: 'Ok',
    placesNotFoundText: 'There are no places nearby. Please try another option',
    reviewsNotFoundText: 'No reviews yet.',
    errorText: 'Ooops. There was an error...',
    tryAgainText: 'Try again',
    distanceUnitText: 'Distance unit',
    emailInvalidText: 'Email is invalid',
    formInvalidText: 'Fill the required fields',
    authInvalidText: 'Invalid credentials',
    emailTakenText: 'The email has already been taken',
    twoBlocksText: '2 blocks',
    sixBlocksText: '6 blocks',
    chooseDistanceText: 'Choose a distance',
    mapTypeText: 'Map type',
    normalMapText: 'Normal',
    satelliteMapText: 'Satellite',
    searchInThisAreaText: 'Search in this area',
    inputTitleText: 'Name *',
    inputDescriptionText: 'Description',
    labelDescriptionText: 'Description',
    inputCategoryText: 'Choose a category *',
    inputAddressText: 'Address',
    inputPhoneText: 'Phone',
    inputWebsiteText: 'Website',
    buttonSubmitPlaceText: 'Add',
    errorFileNotSupportedText: 'File not supported',
    errorFileTooLargeText: 'File too large (Max: 2MB)',
    errorChooseCategoryText: 'Choose a category',
    errorUploadImageText: 'Upload at least the first image',
    placeSavedText: 'Place saved',
    reviewModalTitle: 'Add your review',
    writeReviewButtonText: 'Write a review',
    commentReviewInputText: 'Enter your comment about the place here...',
    submitReviewButtonText: 'Submit review',
    loadingText: 'Loading',
    openReviewsButtonText: 'See all the reviews',
    placeNotFoundErrorText: 'Place not found',
    commentRequiredErrorText: 'Comment field is required',
    commentTooShortErrorText: 'Comment too short',
    successSubmitReviewText: 'Your review has been saved',
    cancelText: 'Cancel',
    chooseOptionText: 'Choose an option',
    photoLibraryText: 'Photo Library',
    cameraText: 'Camera',
    searchText: 'Search',
    authModalText: 'We need to know more about you. Log In or register.',
    loggedInAsText: 'Logged in as',
    loggedOutText: 'You have logged out',
    emailFacebookTakenText: 'The email address is already in use on another account',
    chooseLanguageText: 'Choose language',
    spanishText: 'Spanish',
    englishText: 'English',
    favoritesText: 'My Favorites',
    radioText: 'Music',
    emptyFavoritesText: 'No favorites yet',
    addFavoriteText: 'Add to favorites',
    addedToFavoritesText: 'Place saved',
    othersText: 'Others',
    openWalkthroughText: 'Open Walkthrough',
    profileModalTitle: 'Edit your profile',
    profileSubmitText: 'Update',
    profileUpdated: 'Profile updated',
    profileErrorUpdate: 'Profile not updated',
    deleteAccountText: 'Delete account',
    deleteAccountConfirmText: 'Are you sure you want to delete your account?',
    deleteAccountSuccessText: 'Account deleted',
    deleteAccountErrorText: 'Account not deleted',
    forgotPasswordText: 'Forgot password?',
    resetPasswordText: 'Reset password',
    recoverPasswordSuccessText: 'You will receive a link to create a new password via email',
    emailNotFoundText: 'User not found',
    noPlacesFoundText: 'We couldn\'t find any places',
    searchPlaceholderViewText: 'Search places by name',
    searchAddressText: 'Enter an address',
    errorGpsDisabledText: 'Location options are currently disabled. Turn on GPS and wireless network in location setting',
    errorLocationMissingText: 'It\'s not been possible to determine your current location. Try again after few minutes',
    getStartedText: 'Get Started',
    slide1Text: 'Welcome to Latinoism! Your Guide to Discover Local Hispanic Businesses, Events and News!',
    slide2Text: 'Discover Hispanic businesses nearby',
    slide3Text: 'Search and locate your favorite places on Maps',
    slide4Text: 'Add new places or points of interest',
    slide5Text: 'Save your favorite places at any time',
    changePhotoButtonText: 'Change profile picture'
  });
  $translateProvider.translations('es', {
    appTitle: 'Latinoism',
    categoriesTitle: 'Categorías',
    placesTitle: 'Lugares',
    reviewsTitle: 'Reseñas',
    profileTitle: 'Perfil',
    newPlaceTitle: 'Nuevo lugar',
    mapTitle: 'Mapa',
    nearmeText: 'Cerca de mí',
    chatText: 'Salas de chat',
    addNewPlaceText: 'Añade un lugar',
    profileText: 'Perfil',
    settingsText: 'Ajustes',
    logoutText: 'Cerrar sesión',
    signInViaFacebook: 'Entrar con Facebook',
    signInText: 'Iniciar sesión',
    signUpText: 'Crear una cuenta',
    signInError: 'Inicio de sesión fallido',
    signUpSubmitText: 'Regístrame',
    nameText: 'Nombre',
    emailText: 'Correo',
    phoneText: 'Teléfono celular',
    passwordText: 'Contraseña',
    userSinceText: 'Usuario desde',
    getDirectionsText: 'Ir a dirección',
    callToText: 'Llamar a',
    openWebsiteText: 'Abrir sitio web',
    closeText: 'cerrar',
    okText: 'Aceptar',
    placesNotFoundText: 'No hay lugares cerca de ti. Por favor intenta otra opción.',
    reviewsNotFoundText: 'Este lugar aún no tiene reseñas...',
    errorText: 'Ooops. Ocurrio un error...',
    tryAgainText: 'Intenta de nuevo',
    distanceUnitText: 'Unidad de distancia',
    emailInvalidText: 'Correo es inválido',
    formInvalidText: 'Llena todos los campos requeridos',
    authInvalidText: 'Credenciales inválidas',
    emailTakenText: 'El correo ya ha sido tomado',
    twoBlocksText: '2 cuadras',
    sixBlocksText: '6 cuadras',
    chooseDistanceText: 'Elige una distancia',
    mapTypeText: 'Tipo de mapa',
    normalMapText: 'Normal',
    satelliteMapText: 'Satélite',
    searchInThisAreaText: 'Buscar en esta área',
    inputTitleText: 'Nombre *',
    inputDescriptionText: 'Descripción',
    labelDescriptionText: 'Descripción',
    inputCategoryText: 'Selecciona una categoría *',
    inputAddressText: 'Dirección',
    inputPhoneText: 'Teléfono',
    inputWebsiteText: 'Sitio web',
    buttonSubmitPlaceText: 'Agregar',
    errorFileNotSupportedText: 'Archivo no soportado',
    errorFileTooLargeText: 'Imagen demasiado pesada (Max: 2MB)',
    errorChooseCategoryText: 'Selecciona una categoría',
    errorUploadImageText: 'Añade al menos la primera imagen',
    placeSavedText: 'Lugar guardado',
    reviewModalTitle: 'Añade tu reseña',
    writeReviewButtonText: 'Escribe una reseña',
    commentReviewInputText: 'Introduce tu comentario acerca del lugar aquí...',
    submitReviewButtonText: 'Enviar reseña',
    loadingText: 'Cargando',
    openReviewsButtonText: 'Ver todas las reseñas',
    placeNotFoundErrorText: 'Lugar no encontrado',
    commentRequiredErrorText: 'El campo Comentario es obligatorio',
    commentTooShortErrorText: 'Comentario muy corto',
    successSubmitReviewText: 'Tú reseña ha sido guardada',
    cancelText: 'Cancelar',
    chooseOptionText: 'Elige una opción',
    photoLibraryText: 'Librería de fotos',
    cameraText: 'Cámara',
    searchText: 'Búsqueda',
    authModalText: 'Necesitamos saber más de ti. Inicia sesión ó regístrate.',
    loggedInAsText: 'Ha iniciado sesión cómo',
    loggedOutText: 'Se ha cerrado su sesión correctamente',
    emailFacebookTakenText: 'El correo registrado en Facebook ya está siendo ' +
    'utilizado con otra cuenta',
    chooseLanguageText: 'Lenguaje',
    spanishText: 'Español',
    englishText: 'Inglés',
    favoritesText: 'Mis Favoritos',
    radioText: 'Música',
    emptyFavoritesText: 'Aún no tienes favoritos',
    addFavoriteText: 'Añadir a favoritos',
    addedToFavoritesText: 'Lugar guardado',
    othersText: 'Otros',
    openWalkthroughText: 'Abrir guía de inicio',
    profileModalTitle: 'Edita tu perfil',
    profileSubmitText: 'Actualizar',
    profileUpdated: 'Perfil actualizado',
    profileErrorUpdate: 'Perfil no actualizado',
    deleteAccountText: 'Eliminar cuenta',
    deleteAccountConfirmText: '¿Estás seguro de eliminar tu cuenta?',
    deleteAccountSuccessText: 'Tu cuenta ha sido eliminada.',
    deleteAccountErrorText: 'Ocurrio un error con la eliminación de tu cuenta. Intenta de nuevo más tarde.',
    forgotPasswordText: '¿Olvidaste tu contraseña?',
    resetPasswordText: 'Restablecer contraseña',
    recoverPasswordSuccessText: 'Recibirás un enlace para crear una nueva contraseña vía email',
    emailNotFoundText: 'Usuario no encontrado',
    noResultsFoundText: 'No se encontraron resultados',
    noPlacesFoundText: 'No pudimos encontrar lugares de acuerdo a tu consulta',
    searchPlaceholderViewText: 'Buscar lugares por nombre',
    searchAddressText: 'Introduce una dirección',
    errorGpsDisabledText: 'Las opciones de ubicación están desactivadas. Asegura que el GPS y los datos del equipo estén activados.',
    errorLocationMissingText: 'No fue posible determinar tu ubicación actual. Intenta de nuevo en unos minutos.',
    getStartedText: 'Empezar ahora',
    slide1Text: '¡Bienvenido a Latinoism! Descubra Negocios Hispanos, Eventos y Noticias Locales',
    slide2Text: 'Busca los lugares cerca de ti',
    slide3Text: 'Visualiza su ubicación en el mapa',
    slide4Text: 'Añade tu negocio o lugares de interés',
    slide5Text: 'Encuentra tus lugares favoritos más rápido',
    changePhotoButtonText: 'Cambiar foto de perfil'
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.fallbackLanguage('es');
  $translateProvider.useSanitizeValueStrategy('sanitize');

  // angular.module('main', []);

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/walkthrough');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('app', {
      url: '/app?clear',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl'
    })
    .state('walkthrough', {
      url: '/walkthrough?force',
      templateUrl: 'main/templates/walkthrough.html',
      controller: 'WalkthroughCtrl',
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
    .state('app.categories', {
      url: '/categories',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/categories.html',
          controller: 'CategoryListCtrl'
        }
      }
    })

    .state('app.chat', {
      url: '/chat',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/chat.html',
          controller: 'ChatCtrl'
        }
      }
    })

    .state('app.radio', {
      url: '/radio',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/radio.html',
          controller: 'RadioCtrl'
        }
      }
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/search.html',
          controller: 'SearchCtrl'
        }
      }

    })
    .state('app.favorites', {
      url: '/favorites',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/favorites.html',
          controller: 'FavoriteListCtrl'
        }
      }
    })
    .state('app.places', {
      url: '/places/:categoryId/:categoryTitle',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/places.html',
          controller: 'PlaceListCtrl'
        }
      }
    })
    .state('app.place', {
      url: '/place/:placeId',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/place.html',
          controller: 'PlaceDetailCtrl'
        }
      }
    })
    .state('app.reviews', {
      url: '/place/:placeId/reviews',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/reviews.html',
          controller: 'ReviewListCtrl'
        }
      }
    })
    .state('app.new', {
      url: '/new',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/place-new.html',
          controller: 'PlaceNewCtrl'
        }
      }
    })
    .state('app.map', {
      url: '/map/:categoryId',
      views: {
        'menuContent': {
          templateUrl: 'main/templates/map.html',
          controller: 'MapCtrl'
        }
      }
    });
});

'use strict'
angular.module('main').directive('deviceSlider', function ($ionicPlatform) {

  return {
    scope: {
      device: '@'
    },
    restrict: 'E',
    replace: true,
    transclude: true,
    controller: function ($scope) {
      this.propagateTouch = function (touchEvent) {
        $scope.$broadcast('propagate-touch', touchEvent);
      };
    },
    link: function (scope, element, attr) {
      if (attr.device === 'auto' && $ionicPlatform.is('android')) {
        attr.device = 'nexus6';
      }

      if (attr.device === 'auto' && $ionicPlatform.is('ios')) {
        attr.device = 'iphone5';
      }
    },
    templateUrl: 'main/templates/device-slider.html'
  };
}).directive('deviceFrame', function () {
  return {
    restrict: 'E',
    require: '^deviceSlider',
    link: function (scope, element, attr, deviceSliderCtrl) {
      var ele = element[0];
      ele.addEventListener('touchstart', function (event) {
        deviceSliderCtrl.propagateTouch(event);
				// Don't need to call again center tabs, because as we mimic touch events,
				// when we start touching here it will start the touch move on the panels,
				// and that will trigger the center tabs action
      }, false);

      ele.addEventListener('touchmove', function (event) {
        deviceSliderCtrl.propagateTouch(event);
      }, false);

      ele.addEventListener('touchend', function (event) {
        deviceSliderCtrl.propagateTouch(event);
      }, false);
    }
  };
}).directive('deviceSlides', function (TouchService) {
  return {
    restrict: 'E',
    require: '^deviceSlider',
    link: function (scope, element) {
      var sliderSlides = element[0].querySelector('.slider-slides');

      scope.$on('propagate-touch', function (event, propagatedTouch) {
        TouchService.triggerTouch(sliderSlides, propagatedTouch);
      });
    }
  };
}).service('TouchService', function () {
	// inspired on: https://github.com/hammerjs/touchemulator/blob/master/touch-emulator.js
  function Touch (target, identifier, pos, deltaX, deltaY) {
    deltaX = deltaX || 0;
    deltaY = deltaY || 0;
    this.identifier = identifier;
    this.target = target;
    this.clientX = pos.clientX + deltaX;
    this.clientY = pos.clientY + deltaY;
    this.screenX = pos.screenX + deltaX;
    this.screenY = pos.screenY + deltaY;
    this.pageX = pos.pageX + deltaX;
    this.pageY = pos.pageY + deltaY;
  }

  function TouchList () {

    var touchList = [];

    touchList.item = function (index) {
      return this[index] || null;
    };

		// specified by Mozilla
    touchList.identifiedTouch = function (id) {
      return this[id + 1] || null;
    };

    return touchList;
  }

  function createTouchList (eventTarget, event) {
    var touchList = new TouchList();
		// Modified by me
    if (event.type !== 'touchend') {
      touchList.push(new Touch(eventTarget, 1, event.touches[0], 0, 0));
    }
    return touchList;
  }

  function getTouches (eventTarget, event) {
    var touchList = createTouchList(eventTarget, event);
    return touchList;
  }

  this.triggerTouch = function (newEventTarget, originalTouchEvent) {
    var newTouchEvent = document.createEvent('Event');
    newTouchEvent.initEvent(originalTouchEvent.type, true, true);

    newTouchEvent.touches = getTouches(newEventTarget, originalTouchEvent);
    newTouchEvent.targetTouches = getTouches(newEventTarget, originalTouchEvent);
    newTouchEvent.changedTouches = getTouches(newEventTarget, originalTouchEvent);

    newEventTarget.dispatchEvent(newTouchEvent);
  };
})

'use strict';
angular.module('imgFallback', []).directive('actualSrc', function () {
  return {
    link: function postLink (scope, element, attrs) {
      attrs.$observe('actualSrc', function (newVal) {
        if (newVal !== undefined) {
          var img = new Image();
          img.src = attrs.actualSrc;
          angular.element(img).bind('load', function () {
            element.attr('src', attrs.actualSrc);
          });
        }
      });
    }
  }
});

'use strict';
/* global Parse */
angular.module('main').service('User', function ($q) {
  return {
    getLoggedUser: function () {
      return Parse.User.current();
    },

    signIn: function (data) {

      var defer = $q.defer();

      Parse.User.logIn(data.email, data.password, {
        success: function (user) {
          defer.resolve(user);
        },
        error: function (user, error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    signUp: function (data) {
      var defer = $q.defer();
      var user = new Parse.User();
      user.set({'name': data.name });
      user.set({'username': data.email });
      user.set({'email': data.email });
      user.set({'phone': data.phone });
      user.set({'password': data.password });
      user.set({'roleName': 'User' });

      var acl = new Parse.ACL();
      acl.setPublicReadAccess(false);
      acl.setPublicWriteAccess(false);
      user.setACL(acl);

      user.save(null, {
        success: function (objUser) {
          defer.resolve(objUser);
        },
        error: function (user, error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    signInViaFacebook: function (authData) {

      var expiration = new Date();
      expiration.setSeconds(expiration.getSeconds() + authData.authResponse.expiresIn);
      expiration = expiration.toISOString();

      var facebookAuthData = {
        'id': authData.authResponse.userID,
        'access_token': authData.authResponse.accessToken,
        'expiration_date': expiration
      }

      var defer = $q.defer();

      Parse.FacebookUtils.logIn(facebookAuthData, {
        success: function (user) {
          defer.resolve(user);
        },
        error: function (user, error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    findByEmail: function (email) {

      var defer = $q.defer();

      Parse.Cloud.run('findUserByEmail', { email: email }, {
        success: function (user) {
          defer.resolve(user);
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    update: function (data) {
      var defer = $q.defer();

      var user = Parse.User.current();

      user.set({'name': data.name});

      if (data.email && data.email !== '') {
        user.set({'username': data.email});
        user.set({'email': data.email});
        user.set({'phone': data.phone});
      }

      if (data.password && data.password !== '') {
        user.set('password', data.password);
      }
      user.save(null, {
        success: function (objUser) {
          defer.resolve(objUser);
        },
        error: function (user, error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    updateWithFacebookData: function (data) {

      var defer = $q.defer();

      Parse.Cloud.run('saveFacebookPicture', {}, {
        success: function () {
          var user = Parse.User.current();
          user.set({'email': data.email});
          user.set({'username': data.email});
          user.set({'name': data.name});
          user.setACL(new Parse.ACL(user));
          user.save(null, {
            success: function () {
              user.fetch().then(function (userFetched) {
                defer.resolve(userFetched);
              }, function (error) {
                defer.reject(error);
              })
            },
            error: function (user, error) {
              defer.reject(error);
            }
          });
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    getPublicData: function () {

      var defer = $q.defer();

      var query = new Parse.Query('UserData');
      query.equalTo('user', Parse.User.current());
      query.first().then(function (userData) {

        if (userData) {
          defer.resolve(userData);
        } else {
          defer.reject(Parse.Promise.error({
            code: 1,
            message: 'User Data not found'
          }));
        }
      }, function (error) {
        defer.reject(error);
      });

      return defer.promise;
    },

    logOut: function () {

      var defer = $q.defer();
      Parse.User.logOut().then(function () {
        defer.resolve();
      },
      function () {
        defer.reject();
      });

      return defer.promise;
    },

    recoverPassword: function (email) {

      var defer = $q.defer();

      Parse.User.requestPasswordReset(email, {
        success: function () {
          defer.resolve();
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    destroy: function () {
      var defer = $q.defer();
      Parse.User.current().destroy().then(function () {
        defer.resolve();
      }, function () {
        defer.reject();
      });
      return defer.promise;
    },

    setPhoto: function (parseFile) {
      var defer = $q.defer();

      var user = Parse.User.current();
      user.set({'photo': parseFile});

      user.save(null, {
        success: function (user) {
          defer.resolve(user);
        },
        error: function (user, error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    }
  };
});

'use strict';
angular.module('main').service('Toast', function ($cordovaToast, $ionicPopup) {
  return {
    show: function (msg) {
      if (window.cordova) {
        $cordovaToast.show(msg, 'short', 'bottom')
          .then(function (success) {
            console.log(success);
          }, function (error) {
            console.log(error);
          });
      } else {
        $ionicPopup.alert({
          title: 'Alert',
          template: msg,
          okType: 'button button-clear button-assertive',
        });
      }
    }
  };
});

'use strict';
angular.module('nearme', [
  // load your modules here
  'main', 'roots.controllers', 'roots.services', 'angularMoment', 'ngCordova', 'ngWebAudio'// starting with the main module
]);

angular.module('roots.controllers', []);
angular.module('roots.services', []);

// 'use strict';
angular.module('roots.services')
.factory('Stream', function ($http) {
	var lastFMKey = 'e58addff996f2d753151791987c6f72b';
	var lastFM = 'http://ws.audioscrobbler.com/2.0/?method=track.search&format=json&limit=1&api_key='+ lastFMKey +'&track=';

	function parseStreamResponse(response){
		var regex = response.data.match(/<body[^>]*>((.|[\n\r])*)<\/body>/im)[1];
		var parts = regex.split(',');
		if(parts.length == 7){
			return parts[6];
		}
		return null;
	}

	function getAlbumArt(songTitle){
		return $http.get(lastFM + encodeURIComponent(songTitle)).then(function(response){
			if(response.error){
				return 'main/assets/images/cover.png';
			} else {
				if( response.data.results!== undefined ){
	            	if(response.data.results.trackmatches !="\n" ){
	                	if(response.data.results.trackmatches.track[0].image !== undefined){
	                		return response.data.results.trackmatches.track[0].image[3]['#text'];
	                	} else {
	                		return 'main/assets/images/cover.png';
	                	}
	                } else {
	                	return 'main/assets/images/cover.png';
	                }
	            }
			}
		});
	}

	return {
		getInfo: function(url){
			var streamingUrl = url;
			var streamingDataUrl = streamingUrl + '7.html';

			return $http.get(streamingDataUrl).then(function(data){

				var song = parseStreamResponse(data);

				if(song===''){
					return '';
				}
				return getAlbumArt(song).then(function(albumArt){
					var streamData = {
						song: song,
						albumArt: albumArt
					};
					return streamData;
				});
			});
		}
	};

});

'use strict';
angular.module('main').service('StatusBar', function ($cordovaStatusbar) {

  var TAG = 'StatusBarService';

  var luminance = function (hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');

    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    lum = lum || 0;

		// convert to decimal and change luminosity
    var rgb = '#', c, i;

    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ('00' + c).substr(c.length);
    }
    return rgb;
  }

  return {
    init: function (color) {

      if (window.StatusBar) {
        $cordovaStatusbar.overlaysWebView(true);

        if (window.ionic.Platform.isAndroid()) {
          color = luminance(color, -0.4);
        }

        $cordovaStatusbar.styleHex(color);
      } else {
        console.warn('[' + TAG + ']: Unsupported platform');
      }
    }
  };
});

'use strict';
angular.module('main')
.service('Share', function ($cordovaSocialSharing) {

  var TAG = 'ShareService';

  return {
    sharePlace: function (place) {
      if (window.cordova && place) {
        $cordovaSocialSharing
          .share(place.title, null, place.image.url(), place.website)
            .then(function (result) {
              console.log(result);
            }, function (err) {
              console.warn(err);
            });
      } else {
        console.warn('[' + TAG + '] Unsupported platform');
      }
    }
  };
});

'use strict';
/*global Parse */
angular.module('main').factory('Review', function ($q) {

  var Review = Parse.Object.extend('Review', {
    // Instance methods
  }, {
    // Class methods

    all: function (placeId, page) {

      var defer = $q.defer();

      var Place = Parse.Object.extend('Place');
      var place = new Place();
      place.id = placeId;

      var query = new Parse.Query(this);
      query.include('userData');
      query.equalTo('place', place);
      query.equalTo('isInappropriate', false);
      query.descending('createdAt');

      var limit = 20;
      if (angular.isUndefined(page)) {
        limit = 5;
        page = 0;
      }
      query.skip(page * limit);
      query.limit(limit);

      query.find({
        success: function (reviews) {
          defer.resolve(reviews);
        },
        error: function (reviews, error) {
          defer.resolve(error);
        }
      })

      return defer.promise;
    },

    create: function (data) {

      var defer = $q.defer();

      var objReview = new Review();
      objReview.place = data.place;
      objReview.userData = data.userData;
      objReview.rating = data.rating;
      objReview.comment = data.comment;

      objReview.save(null, {
        success: function (success) {
          defer.resolve(success);
        }, error: function (obj, error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },
  });

  Object.defineProperty(Review.prototype, 'rating', {
    get: function () {
      return this.get('rating');
    },
    set: function (value) {
      this.set('rating', value);
    }
  });

  Object.defineProperty(Review.prototype, 'comment', {
    get: function () {
      return this.get('comment');
    },
    set: function (value) {
      this.set('comment', value);
    }
  });

  Object.defineProperty(Review.prototype, 'userData', {
    get: function () {
      return this.get('userData');
    },
    set: function (value) {
      this.set('userData', value);
    }
  });

  Object.defineProperty(Review.prototype, 'place', {
    get: function () {
      return this.get('place');
    },
    set: function (value) {
      this.set('place', value);
    }
  });

  return Review;
});

'use strict';
/*global cordova */
angular.module('main')
.factory('Pushwoosh', function ($q, $localStorage) {

  var TAG = 'PushWooshService';

  var pushNotification;
  var canPush = false;
  var params = null;

  function init (appId, googleProjectNumber) {

    if (window.cordova) {

      pushNotification = cordova.require('pushwoosh-cordova-plugin.PushNotification');
      pushNotification.startLocationTracking();

      if (window.ionic.Platform.isIOS()) {
        if (appId !== null && appId !== '') {
          params = { 'pw_appid': appId };
          canPush = true;
        }
        else {
          console.warn('[' + TAG + '] Invalid App ID');
        }

      }
      else if (window.ionic.Platform.isAndroid()) {
        if (googleProjectNumber !== null && googleProjectNumber !== '' && appId !== null && appId !== '') {
          params = {
            projectid: googleProjectNumber,
            'pw_appid': appId
          };
          canPush = true;
        }
        else {
          console.warn('[' + TAG + '] Invalid Google Project Number/App ID');
        }
      }
      else {
        console.warn('[' + TAG + '] Unsupported platform');
      }

      // Initialize the plugin
      pushNotification.onDeviceReady(params);

      //reset badges on app start
      if (window.ionic.Platform.isIOS()) {
        pushNotification.setApplicationIconBadgeNumber(0);
      }
    }
    else {
      console.log('[' + TAG + '] Unsupported platform');
    }
  }

  var pw = {
    init: function (appId, googleProjectNumber) {
      init(appId, googleProjectNumber);
    },

    registerDevice: function () {
      var deferred = $q.defer();

      if (canPush) {

        if (!$localStorage.push) {
          pushNotification.registerDevice(deferred.resolve, deferred.reject);
          $localStorage.push = true;
        }
        else {
          console.warn('[' + TAG + '] Device already registered.');
          deferred.resolve(false);
        }
        return deferred.promise;
      }

      deferred.resolve(false);
      return deferred.promise;

    },

    unregisterDevice: function () {
      if (canPush) {
        var deferred = $q.defer();
        pushNotification.unregisterDevice(deferred.resolve, deferred.reject);
        return deferred.promise;
      }
    }
  };

  return pw;
});

'use strict';
/*global Parse */
angular.module('main').factory('Place', function ($q, $localStorage) {

  var Place = Parse.Object.extend('Place', {

    // Instance methods

    getDistance: function (position) {

      var point = new Parse.GeoPoint({
        latitude: position.latitude,
        longitude: position.longitude
      });

      if ($localStorage.unit === 'km') {
        return this.get('location').kilometersTo(point).toFixed(2);
      } else {
        return this.get('location').milesTo(point).toFixed(2);
      }
    }
  }, {
    // Class methods

    all: function (params) {

      var defer = $q.defer();

      var query = new Parse.Query(this);
      var subQueryExpiresAt = new Parse.Query(this);
      var subQueryExpiresAtNotSet = new Parse.Query(this);

      subQueryExpiresAt.greaterThan('expiresAt', new Date());
      subQueryExpiresAtNotSet.doesNotExist('expiresAt');

      query = Parse.Query.or(subQueryExpiresAt, subQueryExpiresAtNotSet);

      if (params.search && params.search !== '') {
        query.contains('canonical', params.search);
      } else {

        var point = new Parse.GeoPoint({
          latitude: params.location.latitude,
          longitude: params.location.longitude
        });

        if ($localStorage.unit === 'km') {
          query.withinKilometers('location', point, params.distance);
        }
        else {
          query.withinMiles('location', point, params.distance);
        }
      }

      if (params.categoryId) {
        var Category = Parse.Object.extend('Category');
        var objCategory = new Category();
        objCategory.id = params.categoryId;
        query.equalTo('category', objCategory);
      }

      var limit = 20;
      if (!params.page) {
        limit = 100;
      }
      else {
        query.skip(params.page * limit);
      }

      query.limit(limit);
      query.equalTo('isApproved', true);

      query.find({
        success: function (places) {
          defer.resolve(places);
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    getFavorites: function (params) {

      var defer = $q.defer();
      var query = new Parse.Query(this);

      var limit = 20;
      query.skip(params.page * limit);
      query.limit(limit);
      query.equalTo('isApproved', true);
      query.equalTo('likes', Parse.User.current());

      query.find({
        success: function (places) {
          defer.resolve(places);
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    get: function (id) {

      var defer = $q.defer();

      var query = new Parse.Query(this);
      query.include('category');

      query.get(id, {
        success: function (place) {
          defer.resolve(place);
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    create: function (place) {
      var defer = $q.defer();

      var objPlace = new Place();
      place.user = Parse.User.current();
      place.location = new Parse.GeoPoint({
        latitude: place.location.lat,
        longitude: place.location.lng
      });

      objPlace.save(place, {
        success: function (success) {
          defer.resolve(success);
        }, error: function (obj, error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    isLiked: function (id) {

      var defer = $q.defer();

      Parse.Cloud.run('isPlaceLiked', { placeId: id }, {
        success: function (response) {
          defer.resolve(response);
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    like: function (id) {

      var defer = $q.defer();

      Parse.Cloud.run('likePlace', { placeId: id }, {
        success: function (response) {
          defer.resolve(response);
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    isStarred: function (id) {

      var defer = $q.defer();

      Parse.Cloud.run('isPlaceStarred', { placeId: id }, {
        success: function (response) {
          defer.resolve(response);
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

  });

  Object.defineProperty(Place.prototype, 'title', {
    get: function () {
      return this.get('title');
    },
    set: function (value) {
      this.set('title', value);
    }
  });

  Object.defineProperty(Place.prototype, 'description', {
    get: function () {
      return this.get('description');
    },
    set: function (value) {
      this.set('description', value);
    }
  });

  Object.defineProperty(Place.prototype, 'location', {
    get: function () {
      return this.get('location');
    },
    set: function (val) {
      this.set('location', new Parse.GeoPoint({
        latitude: val.lat,
        longitude: val.lng
      }));
    }
  });

  Object.defineProperty(Place.prototype, 'latitude', {
    get: function () {
      return this.get('location').latitude;
    }
  });

  Object.defineProperty(Place.prototype, 'longitude', {
    get: function () {
      return this.get('location').longitude;
    }
  });

  Object.defineProperty(Place.prototype, 'address', {
    get: function () {
      return this.get('address');
    },
    set: function (value) {
      this.set('address', value);
    }
  });

  Object.defineProperty(Place.prototype, 'website', {
    get: function () {
      return this.get('website');
    },
    set: function (value) {
      this.set('website', value);
    }
  });

  Object.defineProperty(Place.prototype, 'phone', {
    get: function () {
      return this.get('phone');
    },
    set: function (value) {
      this.set('phone', value);
    }
  });

  Object.defineProperty(Place.prototype, 'image', {
    get: function () {
      if (this.get('image')) {
        return this.get('image');
      } else {
        return null;
      }
    }
  });

  Object.defineProperty(Place.prototype, 'imageThumb', {
    get: function () {
      if (this.get('imageThumb')) {
        return this.get('imageThumb');
      } else {
        return null;
      }
    }
  });

  Object.defineProperty(Place.prototype, 'imageTwo', {
    get: function () {
      return this.get('imageTwo');
    },
    set: function (value) {
      this.set('imageTwo', value);
    }
  });

  Object.defineProperty(Place.prototype, 'imageThree', {
    get: function () {
      return this.get('imageThree');
    },
    set: function (value) {
      this.set('imageThree', value);
    }
  });

  Object.defineProperty(Place.prototype, 'imageFour', {
    get: function () {
      return this.get('imageFour');
    },
    set: function (value) {
      this.set('imageFour', value);
    }
  });

  Object.defineProperty(Place.prototype, 'category', {
    get: function () {
      return this.get('category');
    },
    set: function (value) {
      this.set('category', value);
    }
  });

  Object.defineProperty(Place.prototype, 'user', {
    get: function () {
      return this.get('user');
    },
    set: function (value) {
      this.set('user', value);
    }
  });

  Object.defineProperty(Place.prototype, 'ratingCount', {
    get: function () {
      return this.get('ratingCount');
    }
  });

  Object.defineProperty(Place.prototype, 'ratingTotal', {
    get: function () {
      return this.get('ratingTotal');
    }
  });

  Object.defineProperty(Place.prototype, 'rating', {
    get: function () {
      if (this.ratingCount && this.ratingTotal) {
        if (this.ratingCount > 0 && this.ratingTotal > 0) {
          return Math.round(this.ratingTotal / this.ratingCount);
        }
      }
      return null;
    }
  });

  return Place;
});

'use strict';
/* global Parse */
angular.module('main').factory('ParseFile', function ($q) {

  return {

    upload: function (base64) {

      var defer = $q.defer();
      var parseFile = new Parse.File('image.jpg', { base64: base64 });

      parseFile.save({
        success: function (savedFile) {
          defer.resolve(savedFile);
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    uploadFile: function (file) {

      var defer = $q.defer();
      var parseFile = new Parse.File('image.jpg', file);

      parseFile.save({
        success: function (savedFile) {
          defer.resolve(savedFile);
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },
  };
});

'use strict'
angular.module('main')
.factory('GoogleAnalytics', function ($cordovaGoogleAnalytics) {

  var TAG = 'AnalyticsService';

  var canTrack = false;

  return {
    init: function (trackingId) {
      if (trackingId !== null && trackingId !== '' && window.cordova) {
        $cordovaGoogleAnalytics.debugMode();
        $cordovaGoogleAnalytics.startTrackerWithId(trackingId);
        canTrack = true;
      } else {
        console.warn('[' + TAG + ']: Invalid Tracker ID or not using emulator');
      }
    },

    trackView: function (viewName) {
      if (canTrack) {
        $cordovaGoogleAnalytics.trackView(viewName);
      }
    },

    trackEvent: function (category, action, label) {
      if (canTrack) {
        $cordovaGoogleAnalytics.trackEvent(category, action, label);
      }
    },
    trackException: function (description, isFatal) {
      if (canTrack) {
        $cordovaGoogleAnalytics.trackException(description, isFatal)
      }
    }
  };
});

'use strict';
angular.module('main')
.factory('Geolocation', function ($ionicPlatform, $q) {

  function getCurrentPosition () {
    var deferred = $q.defer();

    function onCurrentPositionResolved (position) {
      deferred.resolve(position);
    }

    function onCurrentPositionFailedToResolve (error) {
      deferred.reject(error);
    }

    $ionicPlatform.ready(function () {
      var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
      navigator.geolocation.getCurrentPosition(
        onCurrentPositionResolved,
        onCurrentPositionFailedToResolve,
        options);
    });

    return deferred.promise;
  }

  return {
    getCurrentPosition: getCurrentPosition
  };
});

'use strict';
/*global Parse FB */
angular.module('main')
.service('Facebook', function ($q, $cordovaFacebook) {

  return {
    getCurrentUser: function () {

      var defer = $q.defer();

      $cordovaFacebook.getLoginStatus().then(function (success) {
        defer.resolve(success);
      }, function (error) {
        defer.reject(error);
      });

      return defer.promise;
    },

    logIn: function () {

      var defer = $q.defer();

      if (window.cordova) {

        $cordovaFacebook.login(['public_profile', 'email'])
        .then(function (success) {
          defer.resolve(success);
        }, function (error) {
          console.error(error);
          defer.reject(error);
        });

      } else {
        Parse.FacebookUtils.logIn(null, {
          success: function (user) {
            defer.resolve(user);
          },
          error: function (user, error) {
            defer.reject(error);
          }
        });
      }

      return defer.promise;
    },

    logOut: function () {

      var defer = $q.defer();

      $cordovaFacebook.logout().then(function (success) {
        defer.resolve(success);
      }, function (error) {
        defer.reject(error);
      });

      return defer.promise;
    },

    me: function () {

      var defer = $q.defer();

      if (window.cordova) {

        $cordovaFacebook.api(
          'me?fields=name,first_name,last_name,gender,email',
          ['public_profile']
        ).then(function (success) {
          defer.resolve(success);
        }, function (error) {
          console.error(error);
          defer.reject(error);
        });

      } else {
        window.fbAsyncInit = function () {

          FB.api(
            '/me',
            { fields: 'name, first_name, last_name, gender, email' },
            function (response) {

              if (!response || response.error) {
                defer.reject(response.error);
              } else {
                defer.resolve(response);
              }
            });
        };
      }

      return defer.promise;
    },
  };
	});

'use strict';
angular.module('main')
.service('Dialog', function ($cordovaDialogs, $q) {

  return {

    alert: function (message, title) {

      var defer = $q.defer();

      if (window.cordova) {

        $cordovaDialogs.alert(message, title)
          .then(function () {
            defer.resolve();
          });

      } else {
        defer.reject('Unsupported platform');
      }
      return defer.promise;
    },

    confirm: function (message, title, buttonsText) {

      var defer = $q.defer();

      if (window.cordova) {

        $cordovaDialogs.confirm(message, title, buttonsText)
          .then(function (result) {

            if (result === 2) {
              defer.resolve(true);
            }

            defer.reject(false);
          });

      } else {
        defer.reject('Unsupported platform');
      }
      return defer.promise;
    }
  };
});

'use strict';
/*global Parse */
angular.module('main').factory('Category', function ($q) {

  var Category = Parse.Object.extend('Category', {
    // Instance methods
  }, {
    // Class methods
    all: function () {

      var defer = $q.defer();

      var query = new Parse.Query(this);
      query.ascending('order');

      query.find({
        success: function (categories) {
          defer.resolve(categories);
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    },

    get: function (id) {
      var defer = $q.defer();

      var query = new Parse.Query(this);

      query.get(id, {
        success: function (category) {
          defer.resolve(category);
        },
        error: function (error) {
          defer.reject(error);
        }
      });

      return defer.promise;
    }
  });

  Object.defineProperty(Category.prototype, 'title', {
    get: function () {
      return this.get('title');
    }
  });

  Object.defineProperty(Category.prototype, 'description', {
    get: function () {
      return this.get('description');
    }
  });

  Object.defineProperty(Category.prototype, 'icon', {
    get: function () {
      return this.get('icon');
    }
  });

  Object.defineProperty(Category.prototype, 'image_url', {
    get: function () {
      return this.get('image').url();
    }
  });

  return Category;
});

'use strict';
/*global Camera */
angular.module('main').service('Camera', function ($cordovaCamera, $q) {

  return {

    getPicture: function (params) {

      var defer = $q.defer();

      if (window.cordova) {

        var sourceType = params.sourceType || Camera.PictureSourceType.CAMERA;

        if (params.sourceType === 'photoLibrary') {
          sourceType = Camera.PictureSourceType.PHOTOLIBRARY
        }

        if (params.sourceType === 'camera') {
          sourceType = Camera.PictureSourceType.CAMERA
        }

        var options = {
          quality: 70,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: sourceType,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 800,
          targetHeight: 800,
          saveToPhotoAlbum: false,
          correctOrientation: true
        }

        $cordovaCamera.getPicture(options).then(function (imageData) {
          defer.resolve(imageData);
        }, function (error) {
          defer.reject(error);
        });

      } else {
        defer.reject('Unsupported platform');
      }
      return defer.promise;
    }
  };
});

'use strict';
/*global AdMob */
angular.module('main')
.service('AdMobService', function ($rootScope, $localStorage) {

  var TAG = 'AdMobService';

  var mInterstitialForAndroid = null;
  var mInterstitialForiOS = null;

  var isInterstitialReady = false;

  // Show interstitial every 15 minutes
  var THRESHOLD_MINUTES = 15;

  var getMinutesBetweenTimes = function (startTime, endTime) {
    var diff = endTime - startTime;
    return (diff / 60000);
  }

  var onAdLoaded = function () {
    isInterstitialReady = true;
    console.log('[' + TAG + '] onAdLoaded: ' + isInterstitialReady);
  }

  var onAdPresent = function () {
    $localStorage.lastAdTimestamp = new Date().getTime();
    console.log('[' + TAG + '] onAdPresent');
    console.log('[' + TAG + '] lastAdTimestamp = ' + $localStorage.lastAdTimestamp)
  }

  var requestInterstitial = function () {

    var interstitialId = ionic.Platform.isAndroid() ?
      mInterstitialForAndroid :
      mInterstitialForiOS;

    if (window.cordova && AdMob && interstitialId) {

      AdMob.prepareInterstitial({
        adId: interstitialId,
        autoShow: false
      });

      document.removeEventListener('onAdLoaded', onAdLoaded);
      document.addEventListener('onAdLoaded', onAdLoaded);
    } else {
      console.warn('[' + TAG + '] Unsupported platform');
    }
  }

  var onAdDismiss = function () {
    requestInterstitial();
    console.log('onAdDismiss');
  }

  var showBanner = function (bannerId) {
    if (window.cordova && AdMob && bannerId) {
      AdMob.createBanner({
        adId: bannerId,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true
      });
    }
  }

  return {

    prepareInterstitial: function (interstitialForAndroid, interstitialForiOS) {
      mInterstitialForAndroid = interstitialForAndroid;
      mInterstitialForiOS = interstitialForiOS;

      document.addEventListener('onAdPresent', onAdPresent);
      document.addEventListener('onAdDismiss', onAdDismiss);

      requestInterstitial();
    },

    canShowInterstitial: function () {
      if (window.cordova && AdMob && isInterstitialReady) {

        // This will be true only the first time
        if (!$localStorage.lastAdTimestamp) {
          return true;
        }

        var lastAdTimestamp = $localStorage.lastAdTimestamp;
        var nowTime = new Date().getTime();
        var diff = getMinutesBetweenTimes(lastAdTimestamp, nowTime);
        console.log('[' + TAG + '] Ad showed ' + diff + ' minutes ago.');
        return diff > THRESHOLD_MINUTES;

      } else {
        return false;
      }
    },

    showBanner: function (bannerId) {
      showBanner(bannerId);
    },

    showInterstitial: function () {
      if (window.cordova && AdMob) {
        AdMob.showInterstitial();
      } else {
        console.warn('[' + TAG + '] Unsupported platform');
      }
    }
  };
});

'use strict';
angular.module('main')
.service('ActionSheet', function ($cordovaActionSheet, $q) {

  return {

    show: function (params) {

      var defer = $q.defer();

      if (window.cordova) {

        var options = {
          title: params.title,
          buttonLabels: params.options,
          addCancelButtonWithLabel: params.cancelText,
          androidEnableCancelButton: true,
          androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT
        };

        $cordovaActionSheet.show(options)
          .then(function (btnIndex) {
            if (btnIndex !== 3) {
              defer.resolve(btnIndex);
            }
            defer.reject('cancel');
          });

      } else {
        defer.reject('Unsupported platform');
      }
      return defer.promise;
    }
  };
});

'use strict';
angular.module('main')
.controller('WalkthroughCtrl',
function ($scope, $state, $localStorage, $ionicPlatform, $cordovaSplashscreen) {

  $scope.onSkip = function () {
    $localStorage.walkthrough = true;
    $state.go('app.categories');
  }

  $scope.$on('$ionicView.loaded', function () {
    $ionicPlatform.ready(function () {
      if (navigator && navigator.splashscreen) {
        $cordovaSplashscreen.hide();
      }
    });
  });
});

'use strict';
angular.module('main')
.controller('SignUpCtrl',
  function ($scope, $state, $ionicLoading, $ionicModal, $translate, $rootScope,
    $filter, User, Toast, GoogleAnalytics) {

    GoogleAnalytics.trackView('Sign Up Screen');

    var trans;

    $translate(['emailInvalidText', 'formInvalidText', 'authInvalidText',
    'emailTakenText', 'signInError', 'loggedInAsText'])
      .then(function (myTranslations) {
        trans = myTranslations;
      });

    $scope.registrar = {};

    var showLoading = function () {

      $ionicLoading.show({
        templateUrl: 'main/templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        scope: $scope,
        showDelay: 0
      });
    }

    var showLogin = function () {
      $ionicLoading.hide();
    }

    var isEmailValid = function (email) {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return re.test(email);
    }

    var resetForms = function () {
      $scope.registrar.name = '';
      $scope.registrar.email = '';
      $scope.registrar.phone = '';
      $scope.registrar.password = '';
    }

    $scope.onSignUp = function (isFormValid) {

      if (!isEmailValid($scope.registrar.email) && $scope.registrar.email !== '') {
        Toast.show(trans.emailInvalidText);
      } else if (!isFormValid) {
        Toast.show(trans.formInvalidText);
      } else {

        showLoading();

        $scope.registrar.email = $filter('lowercase')($scope.registrar.email);

        User.signUp($scope.registrar).then(function () {
          return User.signIn($scope.registrar);
        }).then(function () {
          showLogin();
          Toast.show(trans.loggedInAsText + ' ' + $scope.registrar.email);
          resetForms();
          $rootScope.$broadcast('onUserLogged');
        },
        function (error) {

          showLogin();

          var errorMessage;
          if (error.code === 202 || error.code === 203) {
            errorMessage = trans.emailTakenText;
          } else {
            errorMessage = error.message;
          }

          Toast.show(errorMessage);
        });
      }
    }

    resetForms();

  });

'use strict';
angular.module('main')
.controller('SignInCtrl',
  function ($scope, $state, $ionicLoading, $ionicModal, $translate, $rootScope,
    $filter, Dialog, User, Toast, GoogleAnalytics) {

    GoogleAnalytics.trackView('Sign In Screen');

    var trans;

    $translate(['formInvalidText', 'authInvalidText', 'signInError',
    'loggedInAsText', 'recoverPasswordSuccessText', 'emailNotFoundText'])
      .then(function (myTranslations) {
        trans = myTranslations;
      });

    $scope.login = {};
    $scope.showRecoverPasswordForm = false;

    var showLoading = function () {

      $ionicLoading.show({
        templateUrl: 'main/templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        scope: $scope,
        showDelay: 0
      });
    }

    var showLogin = function () {
      $ionicLoading.hide();
    }

    var resetForms = function () {
      $scope.login.email = '';
      $scope.login.password = '';
    }

    $scope.onSignIn = function (isFormValid) {

      if (!isFormValid) {
        Toast.show(trans.formInvalidText);
        return;
      }

      showLoading();

      $scope.login.email = $filter('lowercase')($scope.login.email);

      User.signIn($scope.login).then(function () {
        showLogin();
        Toast.show(trans.loggedInAsText + ' ' + $scope.login.email);
        resetForms();
        $rootScope.$broadcast('onUserLogged');
      }, function (error) {

        showLogin();

        var errorMessage;
        if (error.code === 101) {
          errorMessage = trans.authInvalidText;
        } else {
          errorMessage = error.message;
        }
        Toast.show(errorMessage);
      });
    }

    $scope.onRecoverPassword = function (bool) {
      $scope.showRecoverPasswordForm = bool;
    }

    $scope.recoverPassword = function (isFormValid) {

      if (!isFormValid) {
        Toast.show(trans.formInvalidText);
      } else {
        showLoading();

        User.recoverPassword($scope.login.email).then(function () {
          showLogin();
          $scope.showRecoverPasswordForm = false;
          Dialog.alert(trans.recoverPasswordSuccessText);
        }, function (error) {

          showLogin();

          var errorMessage = trans.errorText;

          if (error.code === 205) {
            errorMessage = trans.emailNotFoundText;
          }
          Dialog.alert(errorMessage);
        })
      }
    }

    resetForms();

  });

'use strict';
angular.module('main')
.controller('SearchCtrl', function ($scope, $ionicLoading, $state, $filter,
  Place, GoogleAnalytics, Toast) {

  GoogleAnalytics.trackView('Search Place Screen');

  $scope.places = [];
  $scope.maxRating = 5;
  $scope.params = {
    page: 0,
    search: '',
  }

  var isLoadingViewShown = false;
  var isPlacesViewShown = false;
  var isEmptyViewShown = false;
  var isInitialViewShown = true;

  var isMoreData = false;

  var showLoading = function () {

    isLoadingViewShown = true;

    isPlacesViewShown = false;
    isEmptyViewShown = false;
    isInitialViewShown = false;

    $ionicLoading.show({
      templateUrl: 'main/templates/loading.html',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      scope: $scope,
      showDelay: 0
    });
  };

  var showPlaces = function () {

    isPlacesViewShown = true;

    isLoadingViewShown = false;
    isEmptyViewShown = false;
    isInitialViewShown = false;

    $ionicLoading.hide();
  }

  var showEmptyView = function () {

    isEmptyViewShown = true;

    isPlacesViewShown = false;
    isLoadingViewShown = false;
    isInitialViewShown = false;

    $ionicLoading.hide();
  }

  var showInitialView = function () {

    isInitialViewShown = true;

    isEmptyViewShown = false;
    isPlacesViewShown = false;
    isLoadingViewShown = false;

    $ionicLoading.hide();
  }

  var ensureMoreData = function (length) {
    isMoreData = false;
    if (length > 0) {
      isMoreData = true;
    }
  }

  var setPlaces = function (places) {
    for (var i = 0;i < places.length;i++) {
      $scope.places.push(places[i]);
    }
  }

  var setCurrentPage = function (page) {
    $scope.params.page = page;
  }

  var loadPlaces = function () {

    Place.all($scope.params).then(function (places) {
      ensureMoreData(places.length);
      setCurrentPage($scope.params.page + 1);
      setPlaces(places);

      if ($scope.places.length === 0) {
        showEmptyView();
      } else {
        showPlaces();
      }

      $scope.$broadcast('scroll.infiniteScrollComplete');

    }, function (error) {
      Toast.show(error.message);
    });
  }

  $scope.onNavigateToPlace = function (id) {
    $state.go('app.place', {
      placeId: id
    });
  }

  $scope.onSearch = function () {

    if ($scope.params.search !== '') {
      $scope.params.page = 0;
      $scope.places = [];
      $scope.params.search = $filter('lowercase')($scope.params.search);
      showLoading();
      loadPlaces();
    }
  }

  $scope.onLoadMore = function () {
    loadPlaces();
  }

  $scope.moreDataCanBeLoaded = function () {
    return isMoreData;
  }

  $scope.showLoadingView = function () {
    return isLoadingViewShown;
  }

  $scope.showPlaces = function () {
    return isPlacesViewShown;
  }

  $scope.showEmptyView = function () {
    return isEmptyViewShown;
  }

  $scope.showInitialView = function () {
    return isInitialViewShown;
  }

  showInitialView();

})

'use strict';
angular.module('main')
.controller('ReviewListCtrl', function ($scope, $ionicLoading, $state,
  $ionicHistory, $stateParams, $translate, Review, GoogleAnalytics) {

  GoogleAnalytics.trackView('Review List Screen');

  if ($stateParams.clear) {
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
  }

  var placeId = $stateParams.placeId;

  $scope.maxRating = 5;
  $scope.readOnly = true;

  $scope.reviews = [];

  var isLoadingViewShown = false;
  var isReviewViewShown = false;
  var isErrorViewShown = false;
  var isEmptyViewShown = false;

  var currentPage = 0;
  var isMoreData = false;

  var showLoading = function () {

    isLoadingViewShown = true;

    isReviewViewShown = false;
    isErrorViewShown = false;
    isEmptyViewShown = false;

    $ionicLoading.show({
      templateUrl: 'main/templates/loading.html',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      scope: $scope,
      showDelay: 0
    });
  };

  var showReviews = function () {

    isReviewViewShown = true;

    isLoadingViewShown = false;
    isErrorViewShown = false;
    isEmptyViewShown = false;

    $ionicLoading.hide();
  };

  var showErrorView = function () {

    isErrorViewShown = true;

    isReviewViewShown = false;
    isLoadingViewShown = false;
    isEmptyViewShown = false;

    $ionicLoading.hide();
  };

  var showEmptyView = function () {

    isEmptyViewShown = true;

    isErrorViewShown = false;
    isReviewViewShown = false;
    isLoadingViewShown = false;

    $ionicLoading.hide();
  };

  var ensureMoreData = function (length) {
    isMoreData = false;
    if (length > 0) {
      isMoreData = true;
    }
  };

  var setReviews = function (reviews) {
    for (var i = 0;i < reviews.length; i++) {
      $scope.reviews.push(reviews[i]);
    }
  };

  var setCurrentPage = function (page) {
    currentPage = page;
  };

  var loadReviews = function () {

    Review.all(placeId, currentPage)
      .then(function (reviews) {
        ensureMoreData(reviews.length);
        setCurrentPage(currentPage + 1);
        setReviews(reviews);

        if ($scope.reviews.length === 0) {
          showEmptyView();
        } else {
          showReviews();
        }

        $scope.$broadcast('scroll.infiniteScrollComplete');

      }, function (error) {
        showErrorView();
        GoogleAnalytics.trackException(error.message, false);
      });
  };

  $scope.onLoadMore = function () {
    loadReviews();
  };

  $scope.moreDataCanBeLoaded = function () {
    return isMoreData;
  };

  $scope.showLoadingView = function () {
    return isLoadingViewShown;
  };

  $scope.showReviews = function () {
    return isReviewViewShown;
  };

  $scope.showErrorView = function () {
    return isErrorViewShown;
  };

  $scope.showEmptyView = function () {
    return isEmptyViewShown;
  };

  $scope.onReload = function () {
    showLoading();
    loadReviews();
  };

  $scope.$on('$ionicView.enter', function (scopes, states) {
    if (states.direction === 'forward') {
      showLoading();
      loadReviews();
    }
  });
})

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

'use strict';
angular.module('main')
.controller('ProfileCtrl', function ($scope, $rootScope, $ionicHistory, $ionicLoading,
  $translate, $ionicModal, User, Toast, Camera, ParseFile, Dialog, ActionSheet) {

  $scope.user = User.getLoggedUser();

  var trans;

  $translate(['profileUpdated', 'profileErrorUpdate', 'formInvalidText',
    'emailTakenText', 'okText', 'cancelText', 'deleteAccountConfirmText',
    'deleteAccountErrorText', 'deleteAccountSuccessText', 'deleteAccountText',
    'chooseOptionText', 'photoLibraryText', 'cameraText'])
    .then(function (translations) {
      trans = translations;
    });

  var showLoading = function () {
    $ionicLoading.show({
      templateUrl: 'main/templates/loading.html',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      scope: $scope,
      showDelay: 0
    });
  };

  var hideLoading = function () {
    $ionicLoading.hide();
  };

  var onPhotoUpdated = function () {
    $rootScope.$broadcast('onPhotoUpdated');
  };

  var resetUserData = function () {
    var user = User.getLoggedUser();

    $scope.formData = {
      name: user.get('name'),
      phone: user.get('phone'),
      username: user.get('username'),
      email: user.get('email')
    }
  };

  $scope.onImageTapped = function () {

    ActionSheet.show({
      title: trans.chooseOptionText,
      cancelText: trans.cancelText,
      options: [trans.photoLibraryText, trans.cameraText]
    }).then(function (option) {

      var sourceType;
      if (option === 1) {
        sourceType = 'photoLibrary';
      }

      if (option === 2) {
        sourceType = 'camera';
      }

      return Camera.getPicture({sourceType: sourceType});
    }).then(function (image) {
      showLoading();
      return ParseFile.upload(image);
    }).then(function (savedFile) {
      return User.setPhoto(savedFile);
    }).then(function () {
      hideLoading();
      onPhotoUpdated();
    }, function () {
      hideLoading();
    });
  };

  $scope.onDeleteAccount = function () {

    Dialog.confirm(
      trans.deleteAccountConfirmText,
      trans.deleteAccountText,
      [trans.cancelText, trans.okText])
    .then(function () {

      showLoading();

      User.destroy().then(function () {
        hideLoading();
        Toast.show(trans.deleteAccountSuccessText);
        User.logOut().then(function () {
          $rootScope.$broadcast('onAccountDeleted');
          $ionicHistory.goBack();
        })
      }, function () {
        hideLoading();
        Toast.show(trans.deleteAccountErrorText);
      })
    })
  }

  $scope.onUpdateProfile = function (isFormValid) {

    if (!isFormValid) {
      Toast.show(trans.formInvalidText);
    } else {

      showLoading();

      User.update($scope.formData).then(function () {
        Toast.show(trans.profileUpdated);
        hideLoading();
        $scope.closeProfileModal();
        resetUserData();
      }, function (error) {

        var errorMessage;

        if (error.code === 202 || error.code === 203) {
          errorMessage = trans.emailTakenText;
        } else {
          errorMessage = error.message;
        }

        Toast.show(errorMessage);
        hideLoading();
      });

    }
  }

  $ionicModal.fromTemplateUrl('main/templates/profile-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.profileModal = modal;
  });

  $scope.openProfileModal = function () {
    $scope.profileModal.show();
  }

  $scope.closeProfileModal = function () {
    $scope.profileModal.hide();
  }

  $scope.$on('$destroy', function () {
    $scope.profileModal.remove();
  });

  $scope.$on('$ionicView.enter', function () {
    resetUserData();
  });
});

'use strict';
/*global plugin */
angular.module('main')
.controller('PlaceNewCtrl', function ($scope, $translate, $ionicModal, $timeout,
  $localStorage, Place, Category, ParseFile, Toast, Camera, ActionSheet, AdMobService) {

  $scope.storage = $localStorage;

  $scope.categories = [];
  $scope.place = {};
  $scope.place.website = 'http://';

  $scope.isImageOneUploading = false;
  $scope.isImageTwoUploading = false;
  $scope.isImageThreeUploading = false;
  $scope.isImageFourUploading = false;

  var trans;
  var isSavingPlace = false;

  var sideMenu = document.getElementById('side-menu');
  var div = document.getElementById('map_canvas2');
  var map = plugin.google.maps.Map.getMap(div);
  var marker;

  $scope.onScroll = function () {
    if (map) {
      map.refreshLayout();
    }
  }

  $scope.onSearchAddress = function () {

    var req = { address: $scope.place.address };

    if (req.address) {

      plugin.google.maps.Geocoder.geocode(req, function (results) {

        if (results.length) {
          var result = results[0];
          var position = result.position;

          $scope.place.location = position;

          if (!marker) {
            map.addMarker({
              position: position
            }, function (marker1) {
              marker = marker1;
              map.moveCamera({
                target: position,
                zoom: 16
              });
            });
          } else {
            marker.setPosition(position);
            map.moveCamera({
              target: position,
              zoom: 16
            });
          }
        } else {
          Toast.show(trans.noResultsFoundText);
        }
      });
    }
  }

  // Capturing event when Map load are ready.
  map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
    map.setMyLocationEnabled(true);
    $timeout(function () {
      map.refreshLayout();
    }, 1000);

    var mapType = plugin.google.maps.MapTypeId.ROADMAP
    if ($scope.storage.mapType === 'satellite') {
      mapType = plugin.google.maps.MapTypeId.SATELLITE;
    }
    map.setMapTypeId(mapType);
  });

  var toLatLng = function (lat, lng) {
    return new plugin.google.maps.LatLng(lat, lng);
  };

  var onCameraChange = function (position) {
    if (marker) {
      var latLng = toLatLng(position.target.lat, position.target.lng);
      marker.setPosition(latLng);
      $scope.place.location = position.target;
    }
  }

  $scope.$on('$ionicView.leave', function () {
    sideMenu.style.visibility = 'visible';

    if (map) {
      map.setMyLocationEnabled(false);
      map.setClickable(false);
      map.off();
      map.clear();
      map.moveCamera({
        target: toLatLng(0.0, 0.0),
        zoom: 1
      });
    }
  });

  $scope.$on('$ionicView.beforeEnter', function () {
    // Fix issue with side menu + google maps
    sideMenu.style.visibility = 'hidden';

    if (map) {
      map.setMyLocationEnabled(true);
      map.setClickable(true);
      map.on(plugin.google.maps.event.CAMERA_CHANGE, onCameraChange);
    }
  });

  Category.all({ page: 1, limit: 100, filter: ''})
  .then(function (categories) {
    $scope.categories = categories;
  });

  var resetData = function () {
    $scope.place = {};
    $scope.place.website = 'http://';
    $scope.isImageOneUploading = false;
    $scope.isImageTwoUploading = false;
    $scope.isImageThreeUploading = false;
    $scope.isImageFourUploading = false;
  }

  $ionicModal.fromTemplateUrl('main/templates/categories-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.categoriesModal = modal;
  });

  $scope.openCategoriesModal = function () {
    $scope.categoriesModal.show();
    if (map) {
      map.setClickable(false);
    }
  }

  $scope.closeCategoriesModal = function () {
    $scope.categoriesModal.hide();
    if (map) {
      map.setClickable(true);
    }
  }

  $scope.onCategorySelected = function (category) {
    $scope.closeCategoriesModal();
    $scope.place.category = category;
  }

  $scope.uploadImageOne = function () {

    ActionSheet.show({
      title: trans.chooseOptionText,
      cancelText: trans.cancelText,
      options: [trans.photoLibraryText, trans.cameraText]
    }).then(function (option) {

      var sourceType;
      if (option === 1) {
        sourceType = 'photoLibrary';
      }

      if (option === 2) {
        sourceType = 'camera';
      }

      return Camera.getPicture({sourceType: sourceType});
    }).then(function (image) {
      $scope.isImageOneUploading = true;
      return ParseFile.upload(image);
    }).then(function (savedFile) {
      $scope.isImageOneUploading = false;
      $scope.place.image = savedFile;
    }, function () {
      $scope.isImageOneUploading = false;
    })
  }

  $scope.uploadImageTwo = function () {

    ActionSheet.show({
      title: trans.chooseOptionText,
      cancelText: trans.cancelText,
      options: [trans.photoLibraryText, trans.cameraText]
    }).then(function (option) {

      var sourceType = null;
      if (option === 1) {
        sourceType = 'photoLibrary';
      }
      return Camera.getPicture({sourceType: sourceType});
    }).then(function (image) {
      $scope.isImageTwoUploading = true;
      return ParseFile.upload(image);
    }).then(function (savedFile) {
      $scope.isImageTwoUploading = false;
      $scope.place.imageTwo = savedFile;
    }, function () {
      $scope.isImageTwoUploading = false;
    })
  }

  $scope.uploadImageThree = function () {

    ActionSheet.show({
      title: trans.chooseOptionText,
      cancelText: trans.cancelText,
      options: [trans.photoLibraryText, trans.cameraText]
    }).then(function (option) {

      var sourceType = null;
      if (option === 1) {
        sourceType = 'photoLibrary';
      }
      return Camera.getPicture({sourceType: sourceType});
    }).then(function (image) {
      $scope.isImageThreeUploading = true;
      return ParseFile.upload(image);
    }).then(function (savedFile) {
      $scope.isImageThreeUploading = false;
      $scope.place.imageThree = savedFile;
    }, function () {
      $scope.isImageThreeUploading = false;
    })
  }

  $scope.uploadImageFour = function () {

    ActionSheet.show({
      title: trans.chooseOptionText,
      cancelText: trans.cancelText,
      options: [trans.photoLibraryText, trans.cameraText]
    }).then(function (option) {

      var sourceType = null;
      if (option === 1) {
        sourceType = 'photoLibrary';
      }
      return Camera.getPicture({sourceType: sourceType});
    }).then(function (image) {
      $scope.isImageFourUploading = true;
      return ParseFile.upload(image);
    }).then(function (savedFile) {
      $scope.isImageFourUploading = false;
      $scope.place.imageFour = savedFile;
    }, function () {
      $scope.isImageFourUploading = false;
    })
  }

  $scope.onSavePlace = function (isFormValid) {

    if (!isFormValid) {
      Toast.show(trans.formInvalidText);
    } else if (!$scope.place.image) {
      Toast.show(trans.errorUploadImageText);
    } else if (!$scope.place.category) {
      Toast.show(trans.errorChooseCategoryText);
    }  else if (!$scope.place.location) {
      Toast.show(trans.errorLocationMissingText)
    }
    else {

      isSavingPlace = true;

      Place.create($scope.place).then(function () {
        Toast.show(trans.placeSavedText);
        resetData();
        isSavingPlace = false;

        if (AdMobService.canShowInterstitial()) {
          AdMobService.showInterstitial();
        }
      },
      function (error) {
        Toast.show(error.message);
        isSavingPlace = false;
      });
    }
  }

  $scope.isSavingPlace = function () {
    return isSavingPlace;
  }

  $scope.$on('$destroy', function () {
    $scope.categoriesModal.remove();
  });

  $scope.$on('$ionicView.enter', function () {

    $translate(['formInvalidText', 'errorChooseCategoryText', 'errorUploadImageText',
    'errorLocationMissingText', 'placeSavedText', 'cancelText', 'chooseOptionText',
    'photoLibraryText', 'cameraText', 'noResultsFoundText'])
    .then(function (myTranslations) {
      trans = myTranslations;
    });
  });
});

'use strict';
angular.module('main')
.controller('PlaceListCtrl', function ($scope, $rootScope, $ionicLoading, $state,
  $localStorage, $stateParams, $translate, $ionicModal, Geolocation, Place,
  GoogleAnalytics, Dialog) {

  GoogleAnalytics.trackView('Place List Screen');

  $scope.maxRating = 5;
  $scope.storage = $localStorage;
  $scope.categoryTitle = $stateParams.categoryTitle;

  $scope.params = {
    location: null,
    categoryId: $stateParams.categoryId,
    distance: 100.00,
    page: 0,
    search: '',
  }

  var trans;

  $translate(['twoBlocksText', 'sixBlocksText', 'errorGpsDisabledText',
  'errorLocationMissingText'])
    .then(function (translations) {

      trans = translations;

      $scope.distances = [
        { val: 0.20, text: translations.twoBlocksText },
        { val: 0.60, text: translations.sixBlocksText },
        { val: 1.00, text: '1 ' + $scope.storage.unit },
        { val: 5.00, text: '5 ' + $scope.storage.unit },
        { val: 10.00, text: '10 ' + $scope.storage.unit },
        { val: 25.00, text: '25 ' + $scope.storage.unit },
        { val: 50.00, text: '50 ' + $scope.storage.unit },
        { val: 100.00, text: '100 ' + $scope.storage.unit },
      ];
    });

  $scope.places = [];

  var isLoadingViewShown = false;
  var isPlacesViewShown = false;
  var isErrorViewShown = false;
  var isEmptyViewShown = false;

  var isMoreData = false;

  var showLoading = function () {

    isLoadingViewShown = true;

    isPlacesViewShown = false;
    isErrorViewShown = false;
    isEmptyViewShown = false;

    $ionicLoading.show({
      templateUrl: 'main/templates/loading.html',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      scope: $scope,
      showDelay: 0
    });
  };

  var showPlaces = function () {

    isPlacesViewShown = true;

    isLoadingViewShown = false;
    isErrorViewShown = false;
    isEmptyViewShown = false;

    $ionicLoading.hide();
  };

  var showErrorView = function () {

    isErrorViewShown = true;

    isPlacesViewShown = false;
    isLoadingViewShown = false;
    isEmptyViewShown = false;

    $ionicLoading.hide();
  };

  var showEmptyView = function () {

    isEmptyViewShown = true;

    isErrorViewShown = false;
    isPlacesViewShown = false;
    isLoadingViewShown = false;

    $ionicLoading.hide();
  };

  var ensureMoreData = function (length) {
    isMoreData = false;
    if (length > 0) {
      isMoreData = true;
    }
  };

  var setPlaces = function (places) {
    for (var i = 0;i < places.length;i++) {
      $scope.places.push(places[i]);
    }
  };

  var setCurrentPage = function (page) {
    $scope.params.page = page;
  };

  var loadPlaces = function () {

    Place.all($scope.params).then(function (places) {
      ensureMoreData(places.length);
      setCurrentPage($scope.params.page + 1);
      setPlaces(places);

      if ($scope.places.length === 0) {
        showEmptyView();
      } else {
        showPlaces();
      }

      $scope.$broadcast('scroll.infiniteScrollComplete');
      $scope.$broadcast('scroll.refreshComplete');

    }, function () {
      showErrorView();
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.onDistanceSelected = function (distance) {
    $scope.params.distance = distance;
    $scope.params.page = 0;
    $scope.places = [];
    $scope.closeDistanceModal();
    showLoading();
    loadPlaces();
  };

  $scope.onLoadMore = function () {
    loadPlaces();
  };

  $scope.moreDataCanBeLoaded = function () {
    return isMoreData;
  };

  $scope.showLoadingView = function () {
    return isLoadingViewShown;
  };

  $scope.showPlaces = function () {
    return isPlacesViewShown;
  };

  $scope.showErrorView = function () {
    return isErrorViewShown;
  };

  $scope.showEmptyView = function () {
    return isEmptyViewShown;
  };

  $scope.onReload = function () {
    showLoading();

    $scope.params.page = 0;
    $scope.places = [];

    Geolocation.getCurrentPosition().then(function (position) {
      $scope.params.location = position.coords;
      loadPlaces();
    }, function (error) {
      $scope.params.location = null;

      var errorMessage;

      if (error.code === 1 || error.code === 3) {
        errorMessage = trans.errorGpsDisabledText;
      } else {
        errorMessage = trans.errorLocationMissingText;
      }
      Dialog.alert(errorMessage);

      showErrorView();
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $ionicModal.fromTemplateUrl('main/templates/distance-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.distanceModal = modal;
  });

  $scope.openDistanceModal = function () {
    $scope.distanceModal.show();
  }

  $scope.closeDistanceModal = function () {
    $scope.distanceModal.hide();
  }

  $scope.navigateToMap = function () {
    $state.go('app.map', {
      categoryId: $stateParams.categoryId
    });
  };

  $scope.$on('$ionicView.enter', function (scopes, states) {

    if (states.direction === 'forward') {

      showLoading();

      Geolocation.getCurrentPosition().then(function (position) {
        $scope.params.location = position.coords;
        loadPlaces();
      }, function (error) {
        $scope.params.location = null;

        var errorMessage;

        if (error.code === 1 || error.code === 3) {
          errorMessage = trans.errorGpsDisabledText;
        } else {
          errorMessage = trans.errorLocationMissingText;
        }
        Dialog.alert(errorMessage);

        showErrorView();
      });
    }
  });

})

'use strict';
angular.module('main')
.controller('PlaceDetailCtrl', function ($scope, $rootScope, $stateParams, $ionicLoading,
  $cordovaInAppBrowser, $ionicModal, $translate, $state, $ionicSlideBoxDelegate,
  Place, Review, Share, GoogleAnalytics, Toast, User, AdMobService) {

  GoogleAnalytics.trackView('Place Detail Screen');

  var isLoadingViewShown = false;
  var isPlaceViewShown = false;
  var isErrorViewShown = false;
  var isSubmittingReview = false;

  $scope.images = [];
  $scope.reviews = [];
  $scope.review = {
    place: null,
    rating: 3,
    comment: ''
  };
  $scope.maxRating = 5;
  $scope.readOnly = true;

  var trans;
  $translate(['commentRequiredErrorText', 'commentTooShortErrorText',
    'successSubmitReviewText'])
    .then(function (myTranslations) {
      trans = myTranslations;
    });

  var showLoading = function () {

    isLoadingViewShown = true;

    isPlaceViewShown = false;
    isErrorViewShown = false;

    $ionicLoading.show({
      templateUrl: 'main/templates/loading.html',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      scope: $scope,
      showDelay: 0
    });
  };

  var showPlace = function () {

    isPlaceViewShown = true;

    isLoadingViewShown = false;
    isErrorViewShown = false;

    $ionicLoading.hide();
  };

  var showErrorView = function () {

    isErrorViewShown = true;
    isPlaceViewShown = false;
    isLoadingViewShown = false;

    $ionicLoading.hide();
  };

  var setPlace = function (place) {
    $scope.place = place;
    $scope.review.place = place;

    if (place.image) {
      $scope.images.push(place.image);
    }

    if (place.imageTwo) {
      $scope.images.push(place.imageTwo);
    }

    if (place.imageThree) {
      $scope.images.push(place.imageThree);
    }

    if (place.imageFour) {
      $scope.images.push(place.imageFour);
    }
  };

  var loadPlace = function () {

    Place.get($stateParams.placeId).then(function (place) {
      setPlace(place);
      showPlace();
    }, function () {
      showErrorView();
    });
  };

  var loadReviews = function () {

    Review.all($stateParams.placeId).then(function (reviews) {
      $scope.reviews = reviews;
    });
  };

  var isPlaceLiked = function () {
    Place.isLiked($stateParams.placeId).then(function (isLiked) {
      $scope.isLiked = isLiked;
    });
  };

  var isPlaceStarred = function () {
    Place.isStarred($stateParams.placeId).then(function (isStarred) {
      $scope.isStarred = isStarred;
    });
  };

  var resetReviewData = function () {
    $scope.review.rating = 3;
    $scope.review.comment = '';
  };

  $ionicModal.fromTemplateUrl('main/templates/review-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.reviewModal = modal;
  });

  $ionicModal.fromTemplateUrl('main/templates/auth-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.authModal = modal;
  });

  $ionicModal.fromTemplateUrl('main/templates/photos-modal.html', {
    scope: $scope,
    animation: 'slide-in-right'
  }).then(function (modal) {
    $scope.photosModal = modal;
  });

  $scope.openPhotosModal = function (index) {
    $ionicSlideBoxDelegate.$getByHandle('modalPhotosSlideBoxHandle').slide(index);
    $scope.photosModal.show();
  }

  $scope.closePhotosModal = function () {
    $scope.photosModal.hide();
  };

  $scope.openReviewModal = function () {

    if (User.getLoggedUser()) {
      $scope.reviewModal.show();
    } else {
      $scope.authModal.show();
    }
  }

  $scope.closeReviewModal = function () {
    $scope.reviewModal.hide();
  };

  $scope.onSubmitReview = function () {
    if ($scope.review.comment === '') {
      Toast.show(trans.commentRequiredErrorText);
    } else if ($scope.review.comment.length < 30) {
      Toast.show(trans.commentTooShortErrorText);
    } else {

      isSubmittingReview = true;

      User.getPublicData().then(function (userData) {
        $scope.review.userData = userData;
        return Review.create($scope.review);
      }).then(function (review) {
        $scope.reviews.unshift(review);
        Toast.show(trans.successSubmitReviewText);
        resetReviewData();
        isSubmittingReview = false;
        $scope.closeReviewModal();

        $scope.isStarred = true;

        if (AdMobService.canShowInterstitial()) {
          AdMobService.showInterstitial();
        }

      }, function (error) {
        console.error(error.message);
        Toast.show(error.message);
        isSubmittingReview = false;
      });
    }
  };

  $scope.onLikePlace = function () {

    if ($scope.isLiking) {
      return;
    }

    if (User.getLoggedUser()) {

      $scope.isLiking = true;
      Place.like($stateParams.placeId).then(function (response) {
        if (response.action === 'like') {
          $scope.isLiked = true;
        } else {
          $scope.isLiked = false;
        }
        $scope.isLiking = false;

        if (AdMobService.canShowInterstitial()) {
          AdMobService.showInterstitial();
        }
      }, function () {
        $scope.isLiking = false;
      })
    } else {
      $scope.authModal.show();
    }
  }

  $rootScope.$on('onCloseAuthModal', function () {
    $scope.authModal.hide();
  });

  var onUserLogged = $rootScope.$on('onUserLogged', function () {
    $scope.authModal.hide();
  });

  $scope.$on('$destroy', function () {
    $scope.reviewModal.remove();
    $scope.authModal.remove();
    $scope.photosModal.remove();
    onUserLogged();
  });

  $scope.isSubmittingReview = function () {
    return isSubmittingReview;
  };

  $scope.showLoadingView = function () {
    return isLoadingViewShown;
  };

  $scope.showPlace = function () {
    return isPlaceViewShown;
  };

  $scope.showErrorView = function () {
    return isErrorViewShown;
  };

  $scope.onReload = function () {
    showLoading();
    loadPlace();
  };

  $scope.onShare = function () {
    Share.sharePlace($scope.place);
  };

  $scope.openUrl = function (url) {
    $cordovaInAppBrowser.open(url, '_system');
    GoogleAnalytics.trackEvent('Open Website Button', 'Click', url);
  };

  $scope.openGoogleMaps = function (lat, lng) {
    var url = 'http://maps.google.com/?daddr=' + lat + ',' + lng + '';
    $cordovaInAppBrowser.open(url, '_system');
    GoogleAnalytics.trackEvent('Get Directions Button', 'Click', url);
  };

  $scope.existReviews = function () {
    return $scope.reviews.length > 0;
  };

  $scope.existImages = function () {
    return $scope.images.length > 0;
  };

  $scope.$on('$ionicView.enter', function (scopes, states) {
    if (states.direction === 'forward') {
      showLoading();
      loadPlace();
      loadReviews();
      isPlaceLiked();
      isPlaceStarred();
    }
  });
});

'use strict';
angular.module('main')
.controller('MenuCtrl',
  function ($scope, $rootScope, $state, $translate, $timeout, $ionicLoading,
    $ionicModal, $localStorage, User, Toast) {

    $scope.user = User.getLoggedUser();
    $scope.storage = $localStorage;

    var trans;
    $translate(['loggedOutText']).then(function (translations) {
      trans = translations;
    });

    $ionicModal.fromTemplateUrl('main/templates/settings.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $ionicModal.fromTemplateUrl('main/templates/auth-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.authModal = modal;
    });

    var showLoading = function () {
      $ionicLoading.show({
        templateUrl: 'main/templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        scope: $scope,
        showDelay: 0
      });
    };

    $scope.onNavigateToCategories = function () {
      $state.go('app.categories');
    };

    $scope.onNavigateToChat = function () {
      $state.go('app.chat');
    };

    $scope.onNavigateToRadio = function () {
      $state.go('app.radio');
    };

    $scope.onNavigateToSearch = function () {
      $state.go('app.search');
    };

    $scope.onNavigateToNewPlace = function () {
      if ($scope.user) {
        $state.go('app.new');
      } else {
        $scope.authModal.show();
      }
    };

    $scope.onNavigateToProfile = function () {
      if ($scope.user) {
        $state.go('app.profile');
      } else {
        $scope.authModal.show();
      }
    };

    $scope.onNavigateToWalkthrough = function () {
      $scope.onCloseSettings();
      $state.go('walkthrough', {
        force: true
      });
    }

    $scope.onNavigateToFavorites = function () {
      if ($scope.user) {
        $state.go('app.favorites');
      } else {
        $scope.authModal.show();
      }
    }

    $scope.onOpenSettings = function () {
      $scope.modal.show();
    };

    $scope.onCloseSettings = function () {
      $scope.modal.hide();
    };

    $scope.onLogIn = function () {
      $scope.authModal.show();
    };

    $scope.onLanguageSelected = function (lang) {
      $scope.storage.lang = lang;
      $translate.use(lang);
    }

    $scope.onUnitSelected = function (unit) {
      $scope.storage.unit = unit;
    };

    $scope.onMapTypeSelected = function (type) {
      $scope.storage.mapType = type;
    };

    $scope.getPicture = function () {
      if ($scope.user) {
        if ($scope.user.get('photo')) {
          return $scope.user.get('photo').url();
        }
      }
      return 'main/assets/images/avatar.png';
    };

    $scope.onLogout = function () {
      showLoading();
      $timeout(logout, 1000);
    };

    function logout () {
      User.logOut();
      $ionicLoading.hide();
      $scope.user = null;
      Toast.show(trans.loggedOutText);
    }

    $rootScope.$on('onPhotoUpdated', function () {
      $scope.user = User.getLoggedUser();
    });

    $rootScope.$on('onAccountDeleted', function () {
      $scope.user = User.getLoggedUser();
    });

    $rootScope.$on('onUserLogged', function () {
      $scope.user = User.getLoggedUser();
      $scope.authModal.hide();
    });

    $rootScope.$on('onCloseAuthModal', function () {
      $scope.authModal.hide();
    });
  });

'use strict';
/*global plugin  */
angular.module('main')
.controller('MapCtrl', function ($scope, $rootScope, $ionicLoading, $ionicModal,
  $state, $stateParams, $translate, $timeout, $localStorage, GoogleAnalytics,
  Toast, Place, AdMobService, Geolocation, Dialog) {

  GoogleAnalytics.trackView('Map Screen');

  $scope.maxRating = 5;
  $scope.storage = $localStorage;
  $scope.params = {
    location: null,
    categoryId: $stateParams.categoryId,
    distance: 100.00,
    page: 0,
  }

  var trans;

  $translate(['errorText', 'errorGpsDisabledText', 'errorLocationMissingText',
  'placesNotFoundText'])
    .then(function (myTranslations) {
      trans = myTranslations;
    });

  $scope.places = [];

  var markers = [];

  var setPosition = function (lat, lng) {
    return new plugin.google.maps.LatLng(lat, lng);
  };

  var sideMenu = document.getElementById('side-menu');
  var div = document.getElementById('map_canvas');
  var map = plugin.google.maps.Map.getMap(div);

  var isLoadingViewShown = false;
  var isMapViewShown = false;
  var isErrorViewShown = false;

  var showLoading = function () {

    isLoadingViewShown = true;

    isMapViewShown = true;
    isErrorViewShown = false;

    $ionicLoading.show({
      templateUrl: 'main/templates/loading.html',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      scope: $scope,
      showDelay: 0
    });
  };

  var showMap = function () {

    isMapViewShown = true;

    isLoadingViewShown = false;
    isErrorViewShown = false;
    $ionicLoading.hide();
  };

  var setMapPosition = function (position) {
    map.moveCamera({
      target: setPosition(position.lat, position.lng),
      zoom: 16,
    });
  }

  var animateCameraWithBounds = function (points) {

    if (points.length > 0) {
      var latLngBounds = new plugin.google.maps.LatLngBounds(points);

      map.moveCamera({
        target: latLngBounds
      });
    }
  }

  var setMapZoomToFit = function () {

    var points = [];

    for (var i = 0; i < $scope.places.length; i++) {
      var place = $scope.places[i];
      var position = setPosition(place.latitude, place.longitude);
      points.push(position);
    }

    points.push(setPosition(
      $scope.params.location.latitude,
      $scope.params.location.longitude));

    animateCameraWithBounds(points);
  }

  var setPlaces = function (places) {

    $scope.places = places;

    for (var i = 0; i < places.length; i++) {

      var place = places[i];

      var icon = '#E84545';

      if (place.category.get('icon')) {
        icon = {
          url: place.category.get('icon').url(),
          size: {
            width: 32,
            height: 32,
          }
        }
      }

      map.addMarker({
        place: place,
        position: setPosition(place.latitude, place.longitude),
        title: place.title,
        icon: icon,
        animation: plugin.google.maps.Animation.DROP,
        styles: {
          maxWidth: '80%'
        },
        snippet: place.description,
        placeId: place.id,
        markerClick: function (marker) {
          marker.showInfoWindow();
        },
        infoClick: function (marker) {
          $state.go('app.place', { placeId: marker.get('placeId')});
        }
      }, function (marker) {
        markers.push(marker);
      });
    }
  };

  var loadPlaces = function () {

    Place.all($scope.params).then(function (places) {
      setPlaces(places);
      showMap();

      if (places.length === 0) {
        Dialog.alert(trans.placesNotFoundText);
      } else {
        setMapZoomToFit();
      }

    }, function () {
      Toast.show(trans.errorText);
    });
  }

  var removePlaces = function () {
    $scope.places = [];
  }

  var removeMarkers = function () {
    for (var i = 0; i < markers.length; i++) {
      markers[i].remove();
    }
  }

  $scope.onSearchPlaces = function () {

    $timeout(function () {
      // Try to show the ad.
      if (AdMobService.canShowInterstitial()) {
        AdMobService.showInterstitial();
      }
    }, 4000);

    map.getCameraPosition(function (camera) {

      $scope.params.location.latitude = camera.target.lat;
      $scope.params.location.longitude = camera.target.lng;

      showLoading();
      removeMarkers();
      removePlaces();
      loadPlaces();
    });
  }

  $scope.showLoadingView = function () {
    return isLoadingViewShown;
  }

  $scope.showMap = function () {
    return isMapViewShown;
  }

  $scope.showErrorView = function () {
    return isErrorViewShown;
  }

  $scope.onReload = function () {
    showLoading();
    loadPlaces();
  }

  $scope.onPlaceClicked = function (place) {
    $scope.closePlacesModal();

    for (var i = 0; i < markers.length; i++) {
      if (markers[i].get('place') === place) {
        var marker = markers[i];
        marker.showInfoWindow();
        marker.getPosition(function (position) {
          setMapPosition(position);
        })
      }
    }
  }

  $ionicModal.fromTemplateUrl('main/templates/places-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.placesModal = modal;
  });

  $scope.openPlacesModal = function () {
    map.setClickable(false);
    $scope.placesModal.show();
  };

  $scope.closePlacesModal = function () {
    map.setClickable(true);
    $scope.placesModal.hide();
  };

  $scope.$on('$destroy', function () {
    $scope.placesModal.remove();
  });

  // Capturing event when Map load are ready.
  map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
    map.setMyLocationEnabled(true);
    $timeout(function () {
      map.refreshLayout();
    }, 1000)

    var mapType = plugin.google.maps.MapTypeId.ROADMAP
    if ($scope.storage.mapType === 'satellite') {
      mapType = plugin.google.maps.MapTypeId.SATELLITE;
    }
    map.setMapTypeId(mapType);

    showLoading();

    Geolocation.getCurrentPosition().then(function (position) {

      $scope.params.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }

      loadPlaces();
    }, function (error) {

      $scope.params.location = null;

      var errorMessage;

      if (error.code === 1 || error.code === 3) {
        errorMessage = trans.errorGpsDisabledText;
      } else {
        errorMessage = trans.errorLocationMissingText;
      }
      Dialog.alert(errorMessage);

    });
  });


  $scope.$on('$ionicView.leave', function () {
    sideMenu.style.visibility = 'visible';
    map.setMyLocationEnabled(false);
    map.setClickable(false);
    map.off();
  });

  $scope.$on('$ionicView.beforeEnter', function () {
    // Fix issue with side menu + google maps
    sideMenu.style.visibility = 'hidden';
    map.setMyLocationEnabled(true);
    map.setClickable(true);
  });

  $rootScope.$on('$stateChangeStart', function (event, toState) {
    if (toState.name !== 'app.place' && toState.name !== 'app.map') {
      map.clear();
      map.moveCamera({
        target: setPosition(0.0, 0.0),
        zoom: 1
      });
    }
  });
});

'use strict';
angular.module('main')
.controller('FavoriteListCtrl', function ($scope, $ionicLoading, $state,
  $translate, Toast, GoogleAnalytics, Place) {

  GoogleAnalytics.trackView('Favorite List Screen');

  $scope.places = [];
  $scope.maxRating = 5;
  $scope.params = {
    page: 0
  }

  var isLoadingViewShown = false;
  var isPlacesViewShown = false;
  var isErrorViewShown = false;
  var isEmptyViewShown = false;

  var isMoreData = false;

  var showLoading = function () {

    isLoadingViewShown = true;

    isPlacesViewShown = false;
    isErrorViewShown = false;
    isEmptyViewShown = false;

    $ionicLoading.show({
      templateUrl: 'main/templates/loading.html',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      scope: $scope,
      showDelay: 0
    });
  };

  var showPlaces = function () {

    isPlacesViewShown = true;

    isLoadingViewShown = false;
    isErrorViewShown = false;
    isEmptyViewShown = false;

    $ionicLoading.hide();
  };

  var showErrorView = function () {

    isErrorViewShown = true;

    isPlacesViewShown = false;
    isLoadingViewShown = false;
    isEmptyViewShown = false;

    $ionicLoading.hide();
  };

  var showEmptyView = function () {

    isEmptyViewShown = true;

    isErrorViewShown = false;
    isPlacesViewShown = false;
    isLoadingViewShown = false;

    $ionicLoading.hide();
  };

  var ensureMoreData = function (length) {
    isMoreData = false;
    if (length > 0) {
      isMoreData = true;
    }
  };

  var setPlaces = function (places) {
    for (var i = 0;i < places.length;i++) {
      $scope.places.push(places[i]);
    }
  }

  var setCurrentPage = function (page) {
    $scope.params.page = page;
  }

  var loadPlaces = function () {

    Place.getFavorites($scope.params).then(function (places) {
      ensureMoreData(places.length);
      setCurrentPage($scope.params.page + 1);
      setPlaces(places);

      if ($scope.places.length === 0) {
        showEmptyView();
      } else {
        showPlaces();
      }

      $scope.$broadcast('scroll.infiniteScrollComplete');
      $scope.$broadcast('scroll.refreshComplete');

    }, function () {
      showErrorView();
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.navigateToPlace = function (id) {
    $state.go('app.place', {
      placeId: id
    })
  }

  $scope.onLoadMore = function () {
    loadPlaces();
  };

  $scope.moreDataCanBeLoaded = function () {
    return isMoreData;
  };

  $scope.showLoadingView = function () {
    return isLoadingViewShown;
  };

  $scope.showPlaces = function () {
    return isPlacesViewShown;
  };

  $scope.showErrorView = function () {
    return isErrorViewShown;
  };

  $scope.showEmptyView = function () {
    return isEmptyViewShown;
  };

  $scope.onReload = function () {
    $scope.places = [];
    $scope.params.page = 0;
    showLoading();
    loadPlaces();
  }

  $scope.$on('$ionicView.enter', function (scopes, states) {

    if (states.direction === 'forward') {
      showLoading();
      loadPlaces();
    }
  });
});

'use strict';
angular.module('main')
.controller('CategoryListCtrl', function ($scope, $ionicLoading, $ionicPlatform,
  $cordovaSplashscreen, Category, GoogleAnalytics, AdMobService, Config) {

  GoogleAnalytics.trackView('Category List Screen');

  var isLoadingViewShown = false;
  var isCategoriesViewShown = false;
  var isErrorView = false;

  var showLoading = function () {

    isLoadingViewShown = true;

    isCategoriesViewShown = false;
    isErrorView = false;

    $ionicLoading.show({
      templateUrl: 'main/templates/loading.html',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      scope: $scope,
      showDelay: 0
    });
  };

  var setCategories = function (categories) {
    $scope.categories = categories;
  };

  var showCategories = function () {

    isCategoriesViewShown = true;

    isLoadingViewShown = false;
    isErrorView = false;
    $ionicLoading.hide();
  };

  var showErrorView = function () {
    isErrorView = true;

    isCategoriesViewShown = false;
    isLoadingViewShown = false;

    $ionicLoading.hide();
  };

  var loadCategories = function () {

    Category.all().then(function (categories) {
      setCategories(categories);
      showCategories();
      $scope.$broadcast('scroll.refreshComplete');
    }, function () {
      showErrorView();
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.showLoadingView = function () {
    return isLoadingViewShown;
  };

  $scope.showCategories = function () {
    return isCategoriesViewShown;
  };

  $scope.showErrorView = function () {
    return isErrorView;
  };

  $scope.onReload = function () {
    $scope.categories = [];
    showLoading();
    loadCategories();
  };

  $scope.$on('$ionicView.loaded', function () {
    $ionicPlatform.ready(function () {
      if (navigator && navigator.splashscreen) {
        $cordovaSplashscreen.hide();
      }
      AdMobService.showBanner(Config.ENV.admob.bannerId);
    });
  });

  showLoading();
  loadCategories();

})

'use strict';
angular.module('main')
.controller('AuthCtrl',
  function ($scope, $state, $ionicLoading, $ionicModal, $translate, $rootScope,
    $q, Facebook, Dialog, User, Toast, GoogleAnalytics) {

    GoogleAnalytics.trackView('Auth Screen');

    var trans;

    $translate(['signInError', 'loggedInAsText', 'emailFacebookTakenText'])
      .then(function (myTranslations) {
        trans = myTranslations;
      });

    var showLoading = function () {

      $ionicLoading.show({
        templateUrl: 'main/templates/loading.html',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        scope: $scope,
        showDelay: 0
      });
    }

    var hideLoading = function () {
      $ionicLoading.hide();
    }

    var processFacebookLogin = function (fbAuthData) {

      showLoading();

      var fbData = null;

      return Facebook.me().then(function (data) {
        fbData = data;
        return User.findByEmail(data.email);
      }).then(function (user) {

        if (!user.id) {
          return User.signInViaFacebook(fbAuthData);
        } else if (user.get('authData')) {

          if (user.get('authData').facebook.id === fbData.id) {
            return User.signInViaFacebook(fbAuthData);
          }
        } else {
          var deferred = $q.defer();
          deferred.reject(trans.emailFacebookTakenText);
          return deferred.promise;
        }
      }).then(function () {
        return User.updateWithFacebookData(fbData);
      }).then(function (user) {
        hideLoading();
        $scope.closeAuthModal();
        $rootScope.$broadcast('onUserLogged');
        Toast.show(trans.loggedInAsText + ' ' + user.get('email'));
      }, function (error) {
        hideLoading();
        Dialog.alert(error);
      })
    }

    $scope.onLoginViaFacebook = function () {

      Facebook.getCurrentUser().then(function (response) {

        if (response.status === 'connected') {
          processFacebookLogin(response);
        } else {
          Facebook.logIn().then(function (authData) {
            processFacebookLogin(authData);
          });
        }
      });
    }

    $scope.closeAuthModal = function () {
      $rootScope.$broadcast('onCloseAuthModal');
    }

    $ionicModal.fromTemplateUrl('main/templates/sign-up.html', {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function (modal) {
      $scope.signUpModal = modal;
    });

    $ionicModal.fromTemplateUrl('main/templates/sign-in.html', {
      scope: $scope,
      animation: 'slide-in-right'
    }).then(function (modal) {
      $scope.signInModal = modal;
    });

    $scope.openSignInModal = function () {
      $scope.signInModal.show();
    }

    $scope.closeSignInModal = function () {
      $scope.signInModal.hide();
    }

    $scope.openSignUpModal = function () {
      $scope.signUpModal.show();
    }

    $scope.closeSignUpModal = function () {
      $scope.signUpModal.hide();
    }

    var onUserLogged = $rootScope.$on('onUserLogged', function () {
      $scope.closeSignUpModal();
      $scope.closeSignInModal();
    });

    $scope.$on('$destroy', function () {
      $scope.signUpModal.remove();
      $scope.signInModal.remove();
      onUserLogged();
    });

  });

'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  // https://github.com/mwaylabs/generator-m-ionic#gulp-environment
  ENV: {
    /*inject-env*/
    'parse': {
      'appId': '8372292964',
      'serverUrl': 'https://latinoism.herokuapp.com/parse'
    },
    'push': {
      'appId': '142F6-DB8A9',
      'googleProjectNumber': '491285450192'
    },
    'admob': {
      'interstitialForAndroid': 'ca-app-pub-6295754308520131~1534483004',
      'interstitialForiOS': 'ca-app-pub-6295754308520131~1255281402',
      'bannerId': null
    },
    'gaTrackingId': 'UA-88091831-1',
    'theme': 'nearme',
    'unit': 'mi',
    'mapType': 'normal',
    'statusBarColor': '#1b68ea'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  // https://github.com/mwaylabs/generator-m-ionic#gulp-build-vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
