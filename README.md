# VELOOP Rewards Giveaway

## Overview

VELOOP Rewards Giveaway is a responsive frontend demo for browsing rewards, reviewing giveaway states, and exploring winner and prize-claim experiences. It uses frontend mock data only; no real participation, winner selection, delivery, or claim processing is connected.

## Features

- Responsive giveaway page and giveaway cards
- Provided prize assets for featured rewards
- Live countdowns for giveaway timing
- `ACTIVE`, `UPCOMING`, and `ENDED` giveaway states
- Winner announcement slider
- Current and previous winners tabs
- Prize claim modal with mock submission states
- Physical prize claim flow
- Amazon Gift Card email-only claim flow
- Loading, empty, and error states with retry handling
- FAQ accordion
- Giveaway Rules transparency section
- Keyboard-friendly interactions and accessible labels

## Tech Stack

- React
- Vite
- JavaScript
- Bootstrap
- React Icons
- CSS Modules and CSS

## Project Structure

The main application entry points are `src/main.jsx` and `src/App.jsx`.

- `src/components/` contains page sections and reusable UI components.
- `src/components/GiveawayCard/` contains giveaway cards and the loading skeleton.
- `src/components/Countdown/` contains the reusable lifecycle countdown.
- `src/components/WinnersTabs/` contains current/previous winner views and skeletons.
- `src/components/PrizeClaimModal/` contains the mock claim form and dialog states.
- `src/components/LoadingState/`, `EmptyState/`, and `ErrorState/` contain reusable data-state UI.
- `src/data/` contains structured giveaway, winner, and mock state configuration.
- `src/assets/` contains provided prize and supporting image assets.
- `public/` contains public browser assets such as the favicon.

## Mock Data

The application uses structured frontend mock data in `src/data/giveawayData.js`. The shapes are prepared for a future backend, but no API, authentication, database, or real user activity is present.

## Giveaway Lifecycle

Each giveaway supplies its lifecycle separately from its timing data:

- `ACTIVE`: shows entry information and counts down to `endAt`.
- `UPCOMING`: counts down to `startAt` and does not allow participation.
- `ENDED`: shows the ended state without running an active timer.

The structured `status`, `startAt`, and `endAt` fields remain separate from loading states.

## Claim Flow

Physical prizes request:

- Name
- Phone
- Address
- City
- State
- PIN

Amazon Gift Cards request email only. Claim submission is a frontend demo and does not send personal information or trigger delivery.

## State Handling

Sections support independent data states: `loading`, `success`, `empty`, and `error`. Change the values in `src/data/mockDataStates.js` to exercise mock loading, empty, and error presentations. The default configuration is `success`.

## Running Locally

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

## Future Improvements

Potential future work includes:

- Backend/API integration
- Authentication
- Database persistence
- Real giveaway participation
- Real winner selection
- Real claim processing
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
