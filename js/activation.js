'use strict';

(function () {
  var PIN_LIMIT = 5;

  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');

  var successHandler = function (data) {
    window.adverts = data;
    var slicedAdverts = window.adverts.slice(0, PIN_LIMIT);
    window.pins.create(slicedAdverts);
    window.pins.filtersContainer.classList.remove('hidden');
  };

  // Обработка неуспеха при выполнении запроса
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('modal');
    node.classList.add('modal--error');
    node.tabIndex = 0;

    node.textContent = errorMessage;
    document.body.insertBefore(node, document.body.firstChild);

    var closeError = function () {
      node.classList.add('hidden');
    };

    node.addEventListener('click', function () {
      closeError();
    });

    node.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, closeError);
    });
  };

  var initialize = function () {
    window.map.mainPin.addEventListener('mouseup', pinMouseupHandler);
    window.map.mainPin.addEventListener('keydown', pinKeydownHandler);
    window.map.mainPin.focus();
  };

  // Активация страницы
  var pinMouseupHandler = function () {
    // Разблокируем карту и форму
    window.map.location.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    // Разблокируем филдсеты
    fieldsets.forEach(function (item) {
      item.disabled = false;
    });
    window.map.mainPin.removeEventListener('mouseup', pinMouseupHandler);
    window.map.mainPin.removeEventListener('keydown', pinKeydownHandler);

    window.backend.load(successHandler, errorHandler);
  };

  var pinKeydownHandler = function (evt) {
    window.utils.isEnterEvent(evt, pinMouseupHandler);
  };

  initialize();

  window.activation = {
    errorHandler: errorHandler,
    fieldsets: fieldsets,
    initialize: initialize
  };
})();
