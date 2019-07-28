'use strict';

(function () {
  var MAIN_PIN_WIDTH_OFFSET = 33; // Половина ширины главной метки
  var MAIN_PIN_HEIGHT_OFFSET = 87; // Высота главной метки

  var MAIN_PIN_LEFT = 600;
  var MAIN_PIN_TOP = 439;

  // Границы доступной области для перемещения метки
  var MAP_MIN_Y = 130;
  var MAP_MAX_Y = 630;
  var MAP_MIN_X = 33;

  var MainPinPosition = {
    x: MAIN_PIN_LEFT,
    y: MAIN_PIN_TOP
  };

  var location = document.querySelector('.map');

  var mainPin = location.querySelector('.map__pin--main');

  var addressInput = document.querySelector('input[name="address"]');

  // Стартовые координаты главной метки
  var resetMainPinPosition = function () {
    mainPin.style.left = MainPinPosition.x - MAIN_PIN_WIDTH_OFFSET + 'px';
    mainPin.style.top = MainPinPosition.y - MAIN_PIN_HEIGHT_OFFSET + 'px';
    putMainPinPositionToAddress(MainPinPosition);
  };

  // Ставим начальные координаты в поле address
  var putMainPinPositionToAddress = function (coordinates) {
    addressInput.value = coordinates.x + ', ' + coordinates.y;
  };

  // Перетаскивание главной метки
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newX = mainPin.offsetLeft + shift.x;
      var newY = mainPin.offsetTop + shift.y;

      if (newX < MAP_MIN_X - MAIN_PIN_WIDTH_OFFSET) {
        newX = MAP_MIN_X - MAIN_PIN_WIDTH_OFFSET;
      }

      if (newX > mainPin.parentElement.offsetWidth - mainPin.offsetWidth) {
        newX = mainPin.parentElement.offsetWidth - mainPin.offsetWidth;
      }

      if (newY < MAP_MIN_Y - MAIN_PIN_HEIGHT_OFFSET) {
        newY = MAP_MIN_Y - MAIN_PIN_HEIGHT_OFFSET;
      }
      if (newY > MAP_MAX_Y - MAIN_PIN_HEIGHT_OFFSET) {
        newY = MAP_MAX_Y - MAIN_PIN_HEIGHT_OFFSET;
      }

      mainPin.style.left = newX + 'px';
      mainPin.style.top = newY + 'px';

      var position = {
        x: newX + MAIN_PIN_WIDTH_OFFSET,
        y: newY + MAIN_PIN_HEIGHT_OFFSET
      };

      putMainPinPositionToAddress(position);
    };

    var pinUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', pinMoveHandler);
      document.removeEventListener('mouseup', pinUpHandler);
    };

    document.addEventListener('mousemove', pinMoveHandler);
    document.addEventListener('mouseup', pinUpHandler);
  });

  resetMainPinPosition();

  window.map = {
    location: location,
    mainPin: mainPin,
    resetMainPinPosition: resetMainPinPosition
  };
})();
