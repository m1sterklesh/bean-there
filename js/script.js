/*
 * Bean There — бургер-меню.
 * Плавный скролл делает CSS (scroll-behavior: smooth), здесь только
 * открытие/закрытие мобильного меню и его закрытие после клика по ссылке.
 */
(function () {
  'use strict';

  var body = document.body;
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');

  if (!burger || !nav) return;

  // На ширине от 768px меню всегда видно — должно совпадать с брейкпоинтом в CSS
  var desktopQuery = window.matchMedia('(min-width: 768px)');

  function setMenu(isOpen) {
    body.classList.toggle('menu-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  }

  burger.addEventListener('click', function () {
    setMenu(!body.classList.contains('menu-open'));
  });

  // Делегирование: один обработчик на всё меню вместо обработчика на каждой ссылке
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) {
      setMenu(false);
    }
  });

  // Закрытие по Esc, фокус возвращается на бургер
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && body.classList.contains('menu-open')) {
      setMenu(false);
      burger.focus();
    }
  });

  // Если меню было открыто и окно расширили до десктопа, сбрасываем
  // состояние, иначе на body останется overflow: hidden
  desktopQuery.addEventListener('change', function (event) {
    if (event.matches) setMenu(false);
  });
})();
