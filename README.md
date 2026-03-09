# MCDMS — Ionic React Boilerplate

A boilerplate Ionic React web application with TypeScript, SCSS, and routing.

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
npm install
```

### Development server

```bash
npm start
# or
ionic serve
```

Open [http://localhost:8100](http://localhost:8100) in your browser.

### Build for production

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
mcdms/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── assets/
│       └── icon/
├── src/
│   ├── pages/          # Figma frames → pages
│   │   └── Home.tsx
│   ├── components/     # Reusable UI components
│   │   └── Button.tsx
│   ├── layouts/        # Shared layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── services/       # API calls & business logic
│   │   └── ApiService.ts
│   ├── hooks/          # Custom React hooks
│   │   └── useLocalStorage.ts
│   ├── theme/          # Design tokens & global styles
│   │   ├── _tokens.scss   # SCSS variables (colors, typography, spacing)
│   │   ├── variables.scss # Ionic CSS custom properties
│   │   └── global.scss    # Global stylesheet (entry point)
│   ├── App.tsx         # App entry with routing
│   └── index.tsx       # React DOM entry
├── .eslintrc.js
├── ionic.config.json
├── package.json
└── tsconfig.json
```

---

## Adding Pages

1. Create a new file in `src/pages/`, e.g. `Dashboard.tsx`.
2. Register the route in `src/App.tsx`:

```tsx
import Dashboard from './pages/Dashboard';

// Inside IonRouterOutlet:
<Route exact path="/dashboard" component={Dashboard} />
```

## Theme Customisation

Design tokens (colors, typography, spacing) live in `src/theme/_tokens.scss`.
Ionic CSS custom properties are in `src/theme/variables.scss`.

## Environment Variables

Create a `.env` file at the project root:

```
REACT_APP_API_BASE_URL=https://api.example.com
```