'use strict';

(function () {
  var PIN_HALFWIDTH = 25;
  var PIN_HEIGHT = 70;

  // Блок для новых меток
  var container = window.map.location.querySelector('.map__pins');
  // Активная метка
  var activePin = null;
  // Массив пинов на карте
  var currentPins = [];

  // Шаблон для генерации меток
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  // Перем-ные для вставки объявления
  var filtersContainer = window.map.location.querySelector('.map__filters-container');

  // Отрисовка объявлений и добавление их в целевой блок
  var createCard = function (pin) {
    filtersContainer.parentNode.insertBefore(window.card.render(pin), filtersContainer);
  };

  // Деактивация пина
  var deactivate = function () {
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // Скрытие меток на карте
  var removeAll = function () {
    currentPins.forEach(function (pin) {
      pin.remove();
    });
  };

  // Генерация пина на основе шаблона
  var render = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x - PIN_HALFWIDTH + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    // Пину добавляем обработку клика
    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.close();
      pinElement.classList.add('map__pin--active');
      activePin = pinElement;
      createCard(pin);
    });
    return pinElement;
  };

  // Отрисовка меток и добавление их в целевой блок
  var create = function (pins) {
    var fragment = document.createDocumentFragment();
    pins.forEach(function (pin) {
      var currentPin = window.pins.render(pin);
      fragment.appendChild(currentPin);
      currentPins.push(currentPin);
    });
    window.pins.container.appendChild(fragment);
  };

  window.pins = {
    container: container,
    deactivate: deactivate,
    render: render,
    removeAll: removeAll,
    create: create,
    filtersContainer: filtersContainer
  };
})();
