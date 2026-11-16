(() => {
  const container = document.getElementById('publication-list');
  const count = document.getElementById('publication-count');
  const search = document.getElementById('publication-search');
  const empty = document.getElementById('publication-empty');
  const form = document.getElementById('publication-filters');
  const note = document.getElementById('publication-source-note');
  if (!container || !count || !search || !form) return;

  const make = (tag, cls, text) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const render = (entries, query = '') => {
    const q = query.trim().toLocaleLowerCase();
    const shown = entries.filter(p => [p.title, p.authors, p.year, p.venue]
      .some(value => String(value || '').toLocaleLowerCase().includes(q)));
    const fragment = document.createDocumentFragment();
    for (const p of shown) {
      const article = make('article', 'publication');
      article.append(make('div', 'publication-year', p.year || '—'));
      const body = make('div');
      const heading = make('h2');
      const link = make('a', '', p.title);
      // Only allow https:// links from the generated JSON.
      link.href = /^https:\/\//i.test(p.url || '') ? p.url : 'https://scholar.google.com/';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      heading.append(link);
      body.append(heading);
      if (p.authors) body.append(make('p', 'authors', p.authors));
      if (p.venue) body.append(make('p', 'venue', p.venue));
      article.append(body);
      fragment.append(article);
    }
    container.replaceChildren(fragment);
    count.textContent = `${shown.length} ${shown.length === 1 ? 'publication' : 'publications'}` +
      (q ? ` matching your search (of ${entries.length})` : '');
    if (empty) empty.hidden = shown.length > 0;
  };
  fetch('../assets/data/publications.json', { cache: 'no-cache' })
    .then(response => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); })
    .then(data => {
      const entries = Array.isArray(data.publications) ? data.publications : [];
      if (!entries.length) throw new Error('No bibliography loaded');
      // Keep Google Scholar's publication-date order from the supplied source.
      form.hidden = false;
      render(entries);
      search.addEventListener('input', () => render(entries, search.value));
      form.addEventListener('reset', () => setTimeout(() => render(entries), 0));
      if (note) note.textContent = data.updated_utc
        ? `Bibliography updated ${new Date(data.updated_utc).toLocaleDateString()}. Source: ${'Google Scholar'}.`
        : 'Snapshot of the 20 most recent items in Google Scholar publication-date order; see the profile for the complete record.';
    })
    .catch(() => {
      count.textContent = 'Publication data currently unavailable';
      container.textContent = 'The bibliography could not be loaded. Please consult the Google Scholar profile linked below.';
    });
})();
