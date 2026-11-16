# Cetin Lab website

A responsive, six-page academic website for Professor Ahmet Enis Cetin's lab at the University of Illinois Chicago. Built with HTML, CSS, and a small amount of JavaScript. There is no build step, package installation, database, or paid hosting requirement.

**Start here:** open `index.html` to preview the site. Then follow `GITHUB_SETUP.md` to publish it.

## Included pages

| File | Content |
| --- | --- |
| `index.html` | Homepage, research overview, lab photograph, and research highlights |
| `research.html` | Research areas and selected funded projects |
| `people.html` | Principal investigator, current PhD students, and selected alumni |
| `publications.html` | Six selected publications, with author/title/year search and topic filters |
| `software.html` | Four public Cetin Lab research repositories |
| `contact.html` | Faculty email, office, telephone, and graduate-admissions link |
| `assets/css/styles.css` | Layout, typography, colors, and responsive styles |
| `assets/js/main.js` | Mobile navigation and publication filtering |
| `assets/images/` | Two sourced lab photographs and an original waveform favicon |
| `.nojekyll` | Tells GitHub Pages to serve the site without Jekyll processing |
| `GITHUB_SETUP.md` | Browser-based publishing instructions and optional Git commands |
| `CONTENT_SOURCES.md` | Source links, image credits, and roster decisions |

## Content decisions

- Ene Meco is included under **current PhD students**.
- The current list is Omid Milani, Emadeldeen Hamdan, Yingyi Luo, and Ene Meco.
- The supplied former-student names and affiliations are included.
- Xin Zhu and Shuaiang Rong appear as alumni, following the newer 2026 faculty CV (December 2025 and May 2026 graduation, respectively).
- The Google Sites page required sign-in. With the user's approval, this version uses public UIC material, the 2026 CV, the lab's GitHub repositories, publication records, and the user's additional roster information. It is not a complete export of the Google Site.
- Publications are a selected list. ShearFuse-UNet is explicitly labeled a preprint; journal issue years and earlier online-publication years are distinguished where relevant.

## Editing the website

Open the relevant `.html` file in VS Code, Notepad++, or another text editor. Edit the visible text, save, and refresh the browser. Keep the HTML tags around the text intact.

### People

In `people.html`, search for `EDIT STUDENT`. Each student's entry is an `<article class="person-card">`. To add someone, copy an entire student article and update the initials, name, role, research description, and optional research link. Initials are intentional; no stock or invented student portraits are used.

The alumni table and former-MS list are also in `people.html`. Update the meta description at the top if the current roster changes.

### Publications

In `publications.html`, copy an entire `<article class="publication">` for a new paper. Give it a unique `id`; edit its title, authors, year, venue, links, and `data-topics`.

Supported topic values are `efficient`, `environment`, and `biomedical`, separated by spaces. For example, `data-topics="environment efficient"` makes a paper appear under either area. The result count updates automatically when JavaScript runs. Update the initial static count as well for visitors with JavaScript disabled.

All papers remain visible without JavaScript. Search and filters are revealed only after their script initializes.

### Photos

Replace a photo in `assets/images/` and update its filename, dimensions, alternative text, and credit wherever it is used. The homepage photo is specifically labeled as the **2024 FireSENSE team**, not the entire current lab. Image sources and credits are in `CONTENT_SOURCES.md`.

### Colors and text sizes

Change the CSS variables at the top of `assets/css/styles.css`. The palette uses navy, warm white, and red. System fonts make the design self-contained; the pages do not fetch web fonts or depend on a CDN.

### Shared navigation and footer

The header and footer are intentionally present in each HTML file so the site works immediately when opened from disk. If you change navigation links, contact details, or the footer year, update all six pages.

## Preview locally

The simplest option is to double-click `index.html`; navigation and filters work from disk. Optionally, from this folder run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. On Windows, use `py -m http.server 8000` if `python` is unavailable. Press Ctrl+C to stop the preview server.

## Portability

All local page and asset URLs are relative. The same files work at `https://cetin-lab.github.io/` or at a project path such as `https://YOUR-USERNAME.github.io/cetin-lab/`. No domain has been configured and nothing has been published by this deliverable.

## Site behavior

- Responsive layouts and a mobile menu with Escape-to-close behavior.
- Keyboard focus indicators, a skip link, semantic headings, descriptive image alternatives, and reduced-motion support.
- Search and combined topic filtering, including a zero-results state and reset button.
- No tracking, cookies, sign-in, external scripts, or visitor data collection.
- Email and phone links open the visitor's configured applications; no contact form or email-sending backend is implied.

The source notes contain all external content references. Research code linked from the website has its own licensing and setup requirements.
