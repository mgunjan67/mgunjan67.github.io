# Gunjan Kumar Mishra — Research & Products

A complete static portfolio redesign centred on two equal priorities: scientific research and useful products. Warm ivory, forest ink, terracotta, Instrument Serif, DM Sans, original technical artwork, and real project evidence create an editorial visual identity.

## Preview and build

Node.js 20 or later is sufficient. There are no npm dependencies to install.

```sh
npm run dev
npm run check
npm run build
```

The development server prints its local URL. The production build is in `dist/`. The same `index.html`, scripts, stylesheet, and `media/` work directly from a GitHub Pages repository root. `.nojekyll` is included.

## What is included

- Interactive, procedural terrain / wavefield / network study. The artwork is illustrative, not measured data.
- Five research entries, research category filters, project notes with authorship/context, evidence boundaries, public sources, and available BibTeX references.
- Four selected product/build entries and one KaTRIS workbench note.
- Responsive navigation, keyboard-accessible native dialogs, direct project links such as `#project/landslide`, escape/back handling, focus restoration, copy actions, and reduced-motion support.
- Self-hosted open-source fonts, local project media, research and engineering PDF downloads, structured metadata, sitemap, and social preview.
- No tracking, analytics, contact-form backend, external runtime scripts, or third-party font requests.

## Editing content

`index.html` contains the main page. `projects.js` contains the longer project notes and public links. `styles.css` controls the design. `app.js` controls interactions and the procedural visual study. Edit both the visible card and its corresponding note when a project's status changes.

The two CV downloads preserve existing resume artifacts. They are historical snapshots and can contain older manuscript titles; the website uses the latest project evidence available during the redesign. Replace the PDF files when updated CVs are ready.

## Content and media provenance

The selection was grounded in the existing portfolio repository, the user's local resume/project artifacts, relevant connected chat context, and public primary sources. All imagery is local; no stock image is presented as project evidence.

| Work | Status / public reference |
| --- | --- |
| DAS slope-monitoring evaluation | [EGUsphere preprint](https://egusphere.copernicus.org/preprints/2026/egusphere-2026-4315/), [source](https://github.com/mgunjan67/das-himalayan-geohazard-ai) |
| Cook Inlet coherency | Research manuscript; latest manuscript title is used, with no acceptance claim |
| CoherencyGraph-DAS | [Public repository](https://github.com/mgunjan67/coherencygraph-das); unpublished manuscript |
| Runoff forecasting | [EarthArXiv preprint](https://eartharxiv.org/repository/view/10851/) |
| Typing with Emotions | [Earlier TechRxiv preprint](https://doi.org/10.36227/techrxiv.175416003.30236370/v1), [source](https://github.com/bijay-gh/face_emotion_embedding); revision in progress |
| Drone Coordinate Locator | Working local application; original workflow illustration replaces private site data |
| Photo Finisher | Working prototype; fidelity/finish requirements remain unresolved. Panorama media is explicitly identified as a related earlier experiment |
| Atlas | [Open-source local demo](https://github.com/mgunjan67/atlas-compliance); fictional authorities and employee records. Card artwork is an illustrative recreation |
| Construction Timelapse | Existing final output; a web review copy is encoded at 960×720, 5 fps, 102 seconds, about 7 MB, loaded on demand |
| KaTRIS | Early local prototype; no operational safety or measured customer-accuracy claim |

The portrait comes from the old portfolio. Panorama and timelapse evidence comes from the user's existing computer-vision portfolio. Two research figures come from their manuscript artifacts and are reproduced with explanatory captions. Private customer imagery, property addresses, quotes, runtime datasets, and credentials are excluded.

DM Sans and Instrument Serif are distributed under the SIL Open Font License. License files are in `media/fonts/`. The original static portfolio assets and legacy pages remain in the repository for continuity; the new production build includes only the redesigned site and its required assets.

## Hosting

GitHub Pages can serve the repository root without a build step. A private Sites preview uses the identity in `.openai/hosting.json` and the static `dist/` build. The social metadata and canonical URL intentionally point to the original portfolio's public GitHub Pages address.
