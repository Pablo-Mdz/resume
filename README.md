# pablocigoy.com

Personal portfolio of Pablo Cigoy — software developer (web, mobile, UX/UI, AI).

Built with [Astro](https://astro.build), [GSAP](https://gsap.com) (ScrollTrigger + Flip) and [Lenis](https://lenis.darkroom.engineering) smooth scroll. Images are WebP and get responsive sizes at build time via `astro:assets`.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve dist/ locally
```

## Editing content

All text content (projects, experience, education, services, articles, contact) lives in `src/data/site.ts`.

To add a project:

1. Convert the screenshot to WebP and drop it in `src/assets/projects/`.
2. Import it at the top of `src/data/site.ts` and add an entry to `projects` with a `category` of `web`, `mobile`, `uxui` or `ai`.

The filter counts update automatically. The "AI — landing soon" placeholder card shows under the AI filter until it is removed from `src/components/Projects.astro`.

## Deploy

Any static host works. Build command `npm run build`, output directory `dist` (Node 22).
`netlify.toml` already sets this up for Netlify.
