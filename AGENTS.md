# AI_Prompt.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PawsMatch is a pet adoption web app with a Tinder-like swiping interface. The UI is fully localized in Spanish.

## Commands

All commands run from the `app/` directory:

```bash
npm run dev      # Start Vite dev server (localhost:5173)
npm run build    # TypeScript check + Vite production build
npm run lint     # ESLint on .ts/.svelte files
npm run preview  # Preview production build locally
```

**Asset generation** (from `asset-generation/` directory):
```bash

pip run main.py   # Generates pets.json, copy to app/src/data/
```

## Tech Stack

- Svelte 5 
- Tailwind CSS 4 (CSS-first config in `src/index.css` using `@theme` block)
- Framer Motion for swipe animations and micro-interactions


## Architecture

```
app/src/
├── components/
│   ├── PetCard.svelte           # Swipeable card with drag gestures
│   └── AdoptionConfirmation.svelte # Shelter info and scheduling screen
├── hooks/
│   └── usePetStack.svelte.ts    # Pre-fetch buffer (FIFO queue of 3 pets)
├── services/
│   └── petProvider.ts           # Merges local bios with Dog API images
├── types/
│   └── pet.ts                   # Pet and PetProfile interfaces
└── data/
    ├── mockData.ts              # Loads pets.json
    └── pets.json                # 50 dog profiles (Spanish)
```

**App Flow**: Browse (swipe) → Adoption Info → Success → Continue Browsing

**Screen state** managed via `$state<AppScreen>(...)` in `App.svelte` (no router).

## Key Patterns

### Pre-fetch Stack (`usePetStack.svelte.ts`)
Maintains a buffer of 3 pets. On swipe: removes first item (FIFO), background-fetches a new one. The next pet's image is preloaded via a hidden `<img>` element in `App.svelte:129-136` for zero-latency transitions.

Leverages Svelte 5 `$state` runes to maintain the reactive array for zero-latency updates.

### Pet Provider (`petProvider.ts`)
- Selects random local pet bio from `pets.json`
- Fetches random image from `https://dog.ceo/api/breeds/image/random`
- Falls back to golden retriever image on API failure
- Returns `PetProfile` (Pet + imageUrl)

### Type Extension
`PetProfile extends Pet` adds `imageUrl` to the base `Pet` interface (id, name, bio).

## Styling

Custom color palettes defined in `src/index.css` `@theme` block:
- `primary-*`: Sunny yellows
- `warm-*`: Earthy oranges/browns
- `friendly-*`: Soft greens

Custom utilities for mobile safe areas: `safe-top`, `safe-bottom`, `safe-left`, `safe-right`.

Uses `dvh` units for mobile browser chrome handling.

## No Test Framework

Testing is not configured. Would need to add Vitest or Jest if tests are required.