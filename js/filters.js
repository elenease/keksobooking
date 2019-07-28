'use strict';

(function () {
  var ANY_VALUE = 'any';
  var PIN_LIMIT = 5;

  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelector('.map__features');

  var BorderPrice = {
    maxlow: 10000,
    maxmiddle: 50000
  };

  var filterPins = function () {
    // Сортировка по типу
    var checkType = function (advert) {
      return (typeFilter.value === advert.offer.type) || (typeFilter.value === ANY_VALUE);
    };

    // Сортировка по цене
    var checkPrice = function (advert) {
      switch (priceFilter.value) {

        case 'low':
          return advert.offer.price < BorderPrice.maxlow;

        case 'middle':
          return advert.offer.price > BorderPrice.maxlow && advert.offer.price < BorderPrice.maxmiddle;

        case 'high':
          return advert.offer.price > BorderPrice.maxmiddle;

        default:
          return true;
      }
    };

    // Сортировка по кол-ву комнат
    var checkRooms = function (advert) {
      return (+roomsFilter.value === advert.offer.rooms) || (roomsFilter.value === ANY_VALUE);
    };

    // Сортировка по кол-ву гостей
    var checkGuests = function (advert) {
      return (+guestsFilter.value === advert.offer.guests) || (guestsFilter.value === ANY_VALUE);
    };

    // Сортировка по фичам
    var checkFeatures = function (advert) {
      var checkedElements = Array.from(featuresFilter.querySelectorAll('input[type=checkbox]:checked'));
      var selectedFeatures = checkedElements.map(function (item) {
        return item.value;
      });
      return selectedFeatures.every(function (currentFeature) {
        return advert.offer.features.includes(currentFeature);
      });
    };

    // Сортировка всех пинов
    var sortedArray = window.adverts.filter(checkType).filter(checkPrice).filter(checkRooms).filter(checkGuests).filter(checkFeatures).slice(0, PIN_LIMIT);

    window.card.close();
    window.pins.removeAll();
    window.pins.create(sortedArray);
  };

  var filterChangeHandler = window.debounce(filterPins);

  // Отлеживание изменений фильтров
  typeFilter.addEventListener('change', filterChangeHandler);

  priceFilter.addEventListener('change', filterChangeHandler);

  roomsFilter.addEventListener('change', filterChangeHandler);

  guestsFilter.addEventListener('change', filterChangeHandler);

  featuresFilter.addEventListener('change', filterChangeHandler, true);
})();
