
# Pedal Predict (TdF Predictor)

A React + TypeScript web app (built with Vite and shadcn/ui) that lets users predict a **Tour de France winner probability** using an AI/ML-backed API. The UI includes role-based access (Admin / Team Manager / Partner / Viewer) and embeds Power BI dashboards with different visibility per role.

## Features

- **Winner prediction form**: enter race year, rider country, team, and time (hours) and get:
  - win probability
  - confidence score
  - predicted winner label
- **Authentication & roles**: session stored in `localStorage` and exposed via an `AuthContext`
- **Role-based UI**:
  - viewers see a basic summary
  - admin/team_manager/partner see detailed factors
  - admin/team_manager/partner/viewer each get different dashboard sections
- **Dashboards**: embedded Power BI iframes depending on role
- **Routing**: `/`, `/auth`, `/predict` (+ catch-all `*`)

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build tool**: Vite
- **UI**: shadcn/ui + Radix UI, Tailwind CSS
- **State / data**: @tanstack/react-query
- **Routing**: react-router-dom

## Project Structure (high level)

- `src/main.tsx` – React entrypoint, wraps the app in `AuthProvider`
- `src/App.tsx` – Router + providers (React Query, tooltips, toasters)
- `src/contexts/AuthContext.tsx` – auth state + role helpers
- `src/pages/Index.tsx` – landing page (hero, features, updates)
- `src/pages/Predict.tsx` – prediction form + results + role-based dashboards
- `public/` – static assets
- `src/` – app source code

## Getting Started

### Prerequisites
- Node.js (recommended: a recent LTS)
- A package manager (npm is fine)

### Install
```bash
npm install
```

### Run the dev server
```bash
npm run dev
```

Vite is configured to run on port **8080**.

### Build for production
```bash
npm run build
```

### Preview the production build
```bash
npm run preview
```

## Configuration

### API endpoint
The prediction page currently calls:
- `POST http://127.0.0.1:8000/predict`

It sends JSON like:
```json
{
  "year": 2022,
  "time_hours": 94.5,
  "country": "USA",
  "team": "UAE Team Emirates"
}
```

It also includes an Authorization header:
- `Authorization: Bearer <access_token from localStorage>`

So you’ll need a backend running locally on port `8000` that:
- accepts the above request
- returns JSON containing at least: `probability`, `confidence`, `winner_prediction` (and optionally `error`)

### Auth storage
Auth is handled client-side via `localStorage`:
- `access_token`
- `user_role`
- `user_email`

The app considers you authenticated when these values exist.

## Available Routes

- `/` – Home / landing page
- `/auth` – Authentication page (UI is in `src/pages/Auth` in this project)
- `/predict` – Prediction form + results + dashboards

## Notes / Security

This repo is the **frontend**. Since it uses a bearer token from `localStorage`, make sure your backend validates tokens properly and configure CORS safely for deployment.

## License

No license specified yet.
