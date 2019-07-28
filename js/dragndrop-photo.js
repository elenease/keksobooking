'use strict';

(function () {
  var photoBlock = document.querySelector('.ad-form__photo-container');
  var dropZone = document.querySelector('.ad-form__drop-zone');
  var draggedItem = null;

  photoBlock.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'div') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  photoBlock.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  photoBlock.addEventListener('drop', function (evt) {
    evt.preventDefault();
    if (dropZone !== evt.target) {
      evt.target.appendChild(draggedItem);
    }
  });

  photoBlock.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });

  photoBlock.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
  });
})();
