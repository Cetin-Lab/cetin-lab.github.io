"""Best-effort Google Scholar profile synchronizer. Keeps last valid data on error."""
import json
from datetime import datetime, timezone
from pathlib import Path

from scholarly import scholarly

PROFILE_ID = 'apugsswAAAAJ'
OUTPUT = Path('assets/data/publications.json')


def main():
    author = scholarly.search_author_id(PROFILE_ID)
    author = scholarly.fill(author, sections=['publications'])
    raw = author.get('publications', [])
    if not raw:
        raise RuntimeError('No publications received; keeping prior data.')
    result = []
    seen = set()
    for pub in raw:
        bib = pub.get('bib') or {}
        title = str(bib.get('title') or '').strip()
        if not title:
            continue
        publication_id = pub.get('author_pub_id') or ''
        if publication_id:
            link = ('https://scholar.google.com/citations?view_op=view_citation'
                    f'&hl=en&user={PROFILE_ID}&citation_for_view={publication_id}')
        else:
            link = 'https://scholar.google.com/citations?user=' + PROFILE_ID
        key = publication_id or title.casefold()
        if key in seen:
            continue
        seen.add(key)
        year = str(bib.get('pub_year') or bib.get('year') or '')
        result.append({
            'title': title,
            'authors': str(bib.get('author') or bib.get('authors') or ''),
            'year': year,
            'venue': str(bib.get('citation') or bib.get('venue') or bib.get('journal') or bib.get('conference') or ''),
            'url': link,
        })
    if not result:
        raise RuntimeError('No usable records received; keeping prior data.')
    result.sort(key=lambda p: (int(p['year']) if p['year'].isdigit() else 0, p['title'].casefold()), reverse=True)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    temp = OUTPUT.with_suffix('.json.tmp')
    temp.write_text(json.dumps({
        'source': 'Google Scholar profile',
        'profile': f'https://scholar.google.com/citations?user={PROFILE_ID}',
        'updated_utc': datetime.now(timezone.utc).isoformat(),
        'count': len(result),
        'publications': result
    }, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    temp.replace(OUTPUT)
    print(f'Saved {len(result)} Google Scholar profile entries to {OUTPUT}')


if __name__ == '__main__':
    main()
