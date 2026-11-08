# Gunjan Kumar Mishra — Research & Open Tools

An editorial portfolio with two main sections: public research and independent products/open tools. Warm ivory, forest ink, terracotta, self-hosted Instrument Serif and DM Sans, and an original 3D avatar form the visual identity.

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

`index.html` holds the main page, `projects.js` contains the project notes, `app.js` handles the interface and interactive demos, and `styles.css` controls the visual design. `public-content.json` records public source URLs and the deployment asset list. Read `AGENTS.md` before adding content.

The 3D avatar was generated with the built-in image_gen tool using user-supplied public Instagram portrait references and the earlier public portfolio portrait. The raw reference photos are not deployed. The hero, about, and contact sections share one optimized WebP asset. All other visual studies and product-card illustrations are original website artwork. They are labelled as illustrations rather than presented as screenshots or measured results. Font license files are included in `media/fonts/`. No local-project screenshots, videos, internal resumes, customer data, or private project files are included. Current CV requests use an email link. Project-enquiry options open a prefilled email draft without collecting data on a server.

Employment appears as a brief professional entry. Independent projects are described separately. No employer case studies are included.

## Interface

The site includes responsive navigation, research filters, keyboard-accessible native dialogs, direct links such as `#project/atlas`, citation copying, focus restoration, browser-history dismissal, reduced-motion support, and search/social metadata. Fonts are served locally, with no analytics or third-party runtime requests.
