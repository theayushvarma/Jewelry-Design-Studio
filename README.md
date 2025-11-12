# Jewelry Design Studio ✨💍

> Frontend + Backend demo for a Jewelry Design Studio — product search, selection, and ring assembly flow.
> Built with **React + Vite + Tailwind + HeroUI** on the frontend and **Node + Express** on the backend.
> Uses a `db.json` file for mocked API data (diamonds & settings).

---

## Table of Contents

* [Overview](#overview)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Quick Start (Run Locally)](#quick-start-run-locally)

  * Backend (APIs)
  * Frontend (Client)
* [API Endpoints](#api-endpoints)
* [Data Model](#data-model)
* [Feature / Module Breakdown](#feature--module-breakdown)
* [State Management (Redux slices & hooks)](#state-management-redux-slices--hooks)
* [Testing](#testing)

---

## Overview

This project implements a searchable diamond catalogue, selection flow (diamond → setting → ring summary) with features like:

* Search & filter diamonds (client-side / backend mock) 🔎
* Results grid with Quick View modal, Add to Compare, Recently Viewed ❤️
* Selection flow: select diamond → pick a setting → review ring 🛠️
* Mock backend exposes `/api/diamonds` and `/api/settings` (backed by `db.json`) 🗄️

You can run frontend and backend locally and test the full flow.

---

## Tech Stack

* Frontend:

  * React (Vite)
  * Tailwind CSS
  * HeroUI components
  * Framer Motion (animations)
  * Redux Toolkit (state)
  * React Router
* Backend:

  * Node.js + Express
  * `db.json` for dummy data
  * `nodemon` for dev server
* Testing & Tooling:

  * Vitest + React Testing Library (unit)
  * ESLint, Prettier
  * Vite (dev server & build)

---

## Project Structure (high level)

```
/client
  /public
  /src
    /axios
    /components
    /hooks
    /layouts
    /pages
    /store
      /slices
    /utils
    App.tsx
    main.tsx
/server
  server.js
  db.json
  package.json
README.md
```

> The `client` folder is the React app; the `server` folder contains a minimal Express API.

---

## Quick Start (Run Locally) 🚀

### Prerequisites

* Node.js 18+ and npm/yarn/pnpm installed
* Git

### 1) Clone repository

```bash
git clone <your-repo-url>.git
cd JEWELRY-DESIGN-STUDIO
```

### 2) Install dependencies

**Frontend**

```bash
cd client
npm install --legacy-peer-deps
# or yarn
```

**Backend**

```bash
cd ../server
npm install
# or yarn
```

### 3) Start backend (mock API)

```bash
cd server
npm run dev
# expected: server listens on http://localhost:4000 (or port in server.js)
```

### 4) Start frontend

```bash
cd ../client
npm run dev
# Vite will open at http://localhost:5173 (or printed port)
```

### 5) Visit app

Open browser: `http://localhost:5173` — you should be able to search diamonds, select, view settings, and view the final ring page.

---

## API Endpoints (Mock) 🧩

The Express server uses `db.json` to serve mocked results.

**Base URL**: `http://localhost:4000`

* `POST /api/diamonds`

  * Request body example (search & filters):

    ```json
    {
      "page": 1,
      "limit": 10,
      "filters": {
        "quickShip": true,
        "clarity": "vs1,vs2,si1",
        "color": "i,j,k",
        "carat": "0.5-2.0",
        "price": "2000-8000",
        "shape": "emerald",
        "sort_field": "price",
        "sort_order": "asc"
      }
    }
    ```
  * Also supports returning a single diamond by `id`:

    ```json
    { "id": "12345" }
    ```

* `POST /api/settings`

  * Similar structure for settings — or `GET` depending on implementation.

> Response shape: `{ total, page, limit, data: [...] }`

---

## Data Model (Example)

**Diamond**

```json
{
  "id": "AUD9381",
  "shape": "Emerald",
  "carat": 1.93,
  "color": "J",
  "clarity": "VVS2",
  "cut": "Good",
  "lab": "IGI",
  "priceAUD": 9381,
  "reportNumber": "IGI-2025-0001",
  "images": ["/images/emerald-1.jpg"],
  "video": "https://example.com/video.mp4",
  "certi_link": "https://example.com/certificate.pdf",
  "quickShip": false
}
```

**Setting**

```json
{
  "id": "SET-001",
  "title": "Classic Solitaire",
  "sku": "SET-001",
  "metal": "18k Yellow Gold",
  "ring_style": "Solitaire",
  "shape": "Round",
  "price": 500
}
```

---

## Feature / Module Breakdown 🧩

This project is modular. Below is a map of important modules and files (copy/paste location names from your repo):

### Frontend (`/client/src`)

* `pages/`

  * `Diamonds.tsx` — search page & results grid
  * `Settings.tsx` — settings listing & selection
  * `RingPage.tsx` — final review (diamond + setting), total price & checkout

* `components/` (key components)

  * `GridView` / `SettingGridView` — result lists and cards
  * `DiamondDetailModal` / `DiamondDetailPage` — diamond details with image/video toggle
  * `AddToCompareButton` — toggles compare state
  * `SelectionNavBar` — the center-aligned selection progress (Diamond → Setting → Ring)
  * `ResultViewMode` — toggle modes (diamonds / recently viewed / compare)

* `hooks/` (custom hooks)

  * `useDiamondSearchApi` — search API wrapper & metadata
  * `useDiamondSearchFilter` — filters state & update helpers
  * `useRecentlyViewed` — manage recently viewed (persisted via `localStorage`)
  * `useDiamondRingSelection` — select/remove diamond & setting (persisted to sessionStorage or configurable)
  * `useShareOnEmail`, `useConfig` — other helpers

* `store/` (Redux)

  * `slices/compareSlice.ts` — compare add/remove/toggle
  * `slices/recentlyViewedSlice.ts` — track recently viewed
  * `slices/diamondRingSelectionSlice.ts` — diamond + setting selection
  * `diamondSearchApiSlice.ts`, `settingSearchApiSlice.ts` — API results

* `utils/`

  * Formatters: `formatPrice`, `getDiamondTitle`, `getMeasurement`, `getRatio`, color helpers, etc.

* `layouts/DefaultLayout.tsx` — app wrapper

### Backend (`/server`)

* `server.js` — Express server that loads `db.json`, implements endpoints (`/api/diamonds`, `/api/settings`) and supports filtering, sorting, pagination, and searching by `id`.
* `db.json` — mock data for diamonds and settings.

---

## State Management — Key Slices & Hooks 📦

**Main slices**

* `compareSlice` — store `compare.items: Diamond[]`
* `recentlyViewedSlice` — store `recentlyViewed.items: Diamond[]` (saves to localStorage)
* `diamondRingSelectionSlice` — selected diamond & selected setting

**Key hooks**

* `useDiamondRingSelection()` — add / remove / load / clear selections

  * Exposes: `{ diamond, setting, addDiamond, removeDiamondSelection, addSetting, removeSettingSelection, clearAllSelections }`
* `useRecentlyViewed()` — add/remove/load recently viewed
* `useDiamondSearchFilter()` — get current filters, `updateFilters()` function

---

## Persistence: sessionStorage vs localStorage 🗄️

* `recentlyViewedSlice` saves to `localStorage` (persist across reloads).
* `diamondRingSelection` is typically persisted to `sessionStorage` (persists across reloads in the same tab) — this behavior is configurable in `store.ts`.
* If you want to change persistence, edit the `store.subscribe()` logic in `client/src/store/index.ts` to choose which slices to persist.

---

## Testing 🧪

Manual testing done.

## Useful Commands (cheat sheet) 🧾

Frontend:

```bash
cd client
npm install --legacy-peer-deps
npm run dev        # run frontend dev server
npm run build      # create production build
npm run preview    # preview production build
```

Backend:

```bash
cd server
npm install
npm run dev        # start express + nodemon
```
---
