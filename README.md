# Gunjan Kumar Mishra — Research & Products

A portfolio connecting research and product engineering. Cool white, navy, lavender, self-hosted DM Sans, and the original 3D avatar form the visual identity. Selected Angelswing case studies and the Photo Finisher showcase lead into public research and open tools.

## Run and build

Node.js 20 or later is sufficient. No npm packages are required.

```sh
npm run dev
npm run check
npm run build
```

The static site works at a GitHub Pages repository root. `dist/` is a clean production build. The builder copies only the explicit asset list in `public-content.json`.

## Research

- [DAS slope-monitoring evaluation — EGUsphere preprint](https://egusphere.copernicus.org/preprints/2026/egusphere-2026-4315/)
- [Runoff forecasting — EarthArXiv preprint](https://eartharxiv.org/repository/view/10851/)
- [Typing with Emotions — TechRxiv preprint](https://doi.org/10.36227/techrxiv.175416003.30236370/v1)

Descriptions summarize public versions and link to original sources. They do not include unpublished manuscript revisions or unsupported operational claims.

## Independent builds and open tools

- [Atlas](https://github.com/mgunjan67/atlas-compliance): a local evidence-first dashboard using fictional sample data.
- [CoherencyGraph-DAS](https://github.com/mgunjan67/coherencygraph-das): independent research software with publicly documented source and releases.
- [Ball Vision](https://github.com/mgunjan67/ball_detection_yolov9_custom): a public YOLOv9 training notebook and diagnostic artifacts.
- SignalSketch: an original educational experiment built for this portfolio. Frequency and noise controls generate synthetic signals locally; a moving-average toggle lets visitors explore smoothing. It uses no recorded data or external API.

## Content and assets

`index.html` holds the main page, `projects.js` contains the project notes, `showcase.js` contains the neutral photo catalog, `app.js` handles navigation and project dialogs, `photo-lab.js` handles photo comparisons and style exploration, and `styles.css` controls the visual design. `public-content.json` records provenance, scoped user authorization, and the exact deployment asset list. Read `AGENTS.md` before adding content.

The original 3D avatar is preserved. It was generated with the built-in image_gen tool using user-supplied public portrait references; raw reference photos are not deployed. Hero, about, and contact share one optimized WebP. Font licenses are included. CV requests and project enquiries use email links, with no server collection.

The user explicitly authorized limited high-level Angelswing project context on 2026-11-08. Two main case studies cover spatial understanding and construction progress, with a smaller visual-review note. Original generic illustrations explain workflows. Employer/customer screenshots, internal names, private implementation, coordinates, and unverified metrics are excluded.

The user also explicitly authorized the real estate photo collection: 25 saved results from 64 source exposures. Web copies have neutral scene filenames and stripped embedded metadata. Property addresses, full-resolution originals, and third-party comparison edits are excluded. Gallery filters cover interiors, outdoors, and workspaces; each scene compares one source exposure with the saved result.

Three new feature concepts (virtual twilight, wall repaint, and virtual restaging) were created with built-in ImageGen from the approved photographs. They are visibly identified as illustrations of selected items from the 17-feature proposal, separate from Photo Finisher pipeline results. The style lab implements 24 named browser color grades for art-direction exploration. It does not claim 24 production presets; the verified core finishing profiles are Bright natural, Soft natural, and Warm natural.

## Interface

The site includes responsive navigation, research and photo filters, native dialogs, draggable and keyboard-operated comparisons, gallery arrow-key browsing, direct project links such as `#project/atlas`, citation copying, focus restoration, browser-history dismissal, reduced-motion support, and social metadata. Photo thumbnails load lazily; large comparison images load when opened. Fonts are local, with no analytics or third-party runtime requests.
