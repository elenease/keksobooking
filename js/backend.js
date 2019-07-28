'use strict';

(function () {
  var Code = {
    SUCCESS: 200,
    INVALID_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    ERROR_NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  // Отправка данных на сервер
  var save = function (data, loadHandler, errorHandler) {
    var urlSave = 'https://js.dump.academy/keksobooking';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case Code.SUCCESS:
          loadHandler(xhr.response);
          break;

        case Code.INVALID_REQUEST:
          error = 'Неверный запрос';
          break;
        case Code.NOT_AUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case Code.ERROR_NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case Code.SERVER_ERROR:
          error = 'Ошибка сервера';
          break;
        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        errorHandler(error);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', urlSave);
    xhr.send(data);
  };

  // Загрузка объявлений с сервера
  var load = function (loadHandler, errorHandler) {
    var urlLoad = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case Code.SUCCESS:
          loadHandler(xhr.response);
          break;

        case Code.INVALID_REQUEST:
          error = 'Неверный запрос';
          break;
        case Code.NOT_AUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case Code.ERROR_NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case Code.SERVER_ERROR:
          error = 'Ошибка сервера';
          break;

        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        errorHandler(error);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', urlLoad);
    xhr.send();
  };

  window.backend = {
    save: save,
    load: load
  };
})();
