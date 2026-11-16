/* Progressive enhancement: all page content remains readable without JavaScript. */
(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-navigation');
  const closeMenu = () => {
    if (!toggle || !navigation) return;
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  if (toggle && navigation) {
    toggle.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
    navigation.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-header')) closeMenu();
    });
    window.matchMedia('(min-width: 781px)').addEventListener('change', closeMenu);
  }

  const form = document.querySelector('#publication-filters');
  if (!form) return;
  const search = document.querySelector('#publication-search');
  const topic = document.querySelector('#publication-topic');
  const publications = [...document.querySelectorAll('.publication')];
  const count = document.querySelector('#publication-count');
  const empty = document.querySelector('#publication-empty');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const filter = () => {
    const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    let visible = 0;
    publications.forEach(publication => {
      const matches = words.every(word => normalize(publication.textContent).includes(word)) &&
        (topic.value === 'all' || publication.dataset.topics.split(' ').includes(topic.value));
      publication.hidden = !matches;
      if (matches) visible++;
    });
    count.textContent = `Showing ${visible} of ${publications.length} selected publications`;
    empty.hidden = visible !== 0;
  };
  form.hidden = false;
  search.addEventListener('input', filter);
  topic.addEventListener('change', filter);
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => window.setTimeout(filter, 0));
  filter();
})();
