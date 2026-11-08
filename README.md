# Gunjan Mishra — Portfolio

A concise personal portfolio: two visual project links, three research entries, a short bio, and contact. The design uses off-white, charcoal, a restrained olive accent, and the existing 3D avatar. Detailed photo browsing is on its own project page.

## Run

Node.js 20 or later; no npm packages are required.

```sh
npm run dev
npm run check
npm run build
```

The static pages work at a GitHub Pages repository root. The build cleans `dist/` and copies only explicitly listed assets.

## Pages and content

- `index.html`: introduction, Photo Finisher and Angelswing project links, public research, bio, contact.
- `photo-finisher.html`: 25 user-approved saved comparisons, scene filters, keyboard gallery navigation, and optional feature/style explorations in closed disclosures.
- `angelswing.html`: brief summaries of spatial understanding and construction-progress work, with original generic illustrations.
- `app.js`: responsive navigation. `photo-lab.js` and `showcase.js`: photo interactions and neutral scene data.
- `projects.js`: source-backed content reference retained for provenance; the previous long project-note interface is no longer used or deployed.

`public-content.json` records public research sources, explicit content authorization, visual provenance, and the deployment asset list. Read `AGENTS.md` before adding content.

The user approved high-level Angelswing summaries and the photo collection on 2026-11-08. Employer/customer screenshots, private methods, internal names, coordinates, and unverified metrics are excluded. The approved photo collection uses neutral filenames and stripped metadata. No property addresses or third-party benchmark edits are included.

The three feature concepts were generated with ImageGen and are identified separately from the 25 saved pipeline results. The 24 style directions are browser color-grade previews, not production preset claims. Core product finishes are Bright natural, Soft natural, and Warm natural.

The original avatar is unchanged. Raw portrait references are not deployed. Research entries link directly to their public preprints. Contact links open email; the site uses no analytics or third-party runtime requests.
