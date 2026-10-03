# Elevate Apps Academy — React Project

## Requirements
- Node.js 18 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Project structure
```text
elevate-apps-academy/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── src/
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

## Notes
- The original page's Tailwind utility classes and custom animation configuration are retained through the Tailwind CDN in `index.html`.
- Counseling form submissions currently show a front-end confirmation only. Connect a backend/API before treating bookings as saved or sending notifications.
