# Klose Portfolio

A modern, immersive portfolio website built with React and Vite.

## Features

- WebGL fire-shader hero background
- Interactive tech-stack animations with Three.js
- Framer Motion text and layout transitions
- Animated Klose brand logo and magnetic CTA buttons
- Light and dark themes via React Context
- Responsive portfolio, skills, testimonials, contact, and footer sections

## Tech stack

React 18, Vite, Framer Motion, Three.js, GSAP, Swiper, React Icons, and CSS Modules.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

Open PowerShell in the project directory:

```powershell
cd C:\Users\Klose\Desktop\klose-portfolio
npm.cmd ci
npm.cmd run dev
```

Vite will print a local URL, normally `http://localhost:5173/`. Keep the terminal open while using the site. Press `Ctrl+C` to stop the development server.

On macOS or Linux, use the equivalent commands:

```bash
npm ci
npm run dev
```

## Production build

```powershell
npm.cmd run build
```

The deployable files are created in `dist/`.

## Troubleshooting

If dependency installation fails or files in `node_modules` appear incomplete:

1. Close editors, terminals, sync apps, and File Explorer windows that may be using the project.
2. Delete only the project's `node_modules` directory.
3. Run `npm.cmd ci` again.

If the project is stored in a protected or encrypted Desktop/Documents folder, move it to a development directory such as `C:\Projects\klose-portfolio` before reinstalling dependencies.

## Images

Place site images in `public/images/`:

- `about.jpg` - profile photo
- `portfolio1.jpg` through `portfolio6.jpg` - project screenshots
- `testi1.jpg` through `testi4.jpg` - testimonial avatars

## Color palette

| Token | Value |
| --- | --- |
| Primary Dark | `#004B3B` |
| Primary Mid | `#50C878` |
| Accent Light | `#9DC183` |
| Deep Dark | `#004225` |
| Teal | `#097969` |
| BG Light | `#f4faf6` |
| Text Dark | `#0B3D2E` |

Built by Akongseh Klose - YIBS HND Software Engineering.
