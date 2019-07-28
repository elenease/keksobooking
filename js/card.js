'use strict';

(function () {
  var HouseType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

  var cardElement = null;
  var closeButton = null;

  // Конвертация названий типа жилья
  var convertType = function (type) {
    var typeValue = HouseType[type];
    return typeValue;
  };

  // Рендеринг списка фичей для объявления
  var getFeatures = function (features) {
    if (!features.length) {
      return;
    }
    var featuresContainer = document.createElement('ul');
    featuresContainer.classList.add('popup__features');
    features.forEach(function (feature) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + feature);
      featuresContainer.appendChild(featureElement);
    });
    cardElement.appendChild(featuresContainer);
  };

  // Рендеринг описания объявления
  var getDescription = function (description) {
    var descriptionBlock = cardElement.querySelector('.popup__description');
    if (description.length) {
      descriptionBlock.textContent = description;
    }
  };

  // Рендеринг списка фотографий жилья
  var getPhotos = function (photos) {
    if (!photos.length) {
      return;
    }
    var photosContainer = document.createElement('div');
    photosContainer.classList.add('popup__photos');
    photos.forEach(function (photo) {
      var photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.alt = 'Фотография жилья';
      photoElement.src = photo;
      photosContainer.appendChild(photoElement);
    });
    cardElement.appendChild(photosContainer);
  };

  // Закрытие объявления при нажатии Esc
  var escKeydownHandler = function (evt) {
    window.utils.isEscEvent(evt, close);
  };

  // Закрытие объявления при клике
  var closeButtonClickHandler = function () {
    close(cardElement);
  };

  var close = function () {
    window.pins.deactivate();
    if (cardElement) {
      cardElement.remove();
      cardElement = null;
      document.removeEventListener('keydown', escKeydownHandler);
    }
  };

  // Генерация карточки объявления на основе шаблона
  var render = function (card) {
    cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('img').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = card.offer.price + '&#x20bd;<span>/ночь</span>';
    cardElement.querySelector('.popup__type').textContent = convertType(card.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    getFeatures(card.offer.features);
    getDescription(card.offer.description);
    getPhotos(card.offer.photos);

    // Обработчики событий для объявления
    closeButton = cardElement.querySelector('.popup__close');
    closeButton.addEventListener('click', closeButtonClickHandler);
    document.addEventListener('keydown', escKeydownHandler);
    return cardElement;
  };

  window.card = {
    close: close,
    render: render
  };
})();
