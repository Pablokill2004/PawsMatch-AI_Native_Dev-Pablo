# PawsMatch 🐾

PawsMatch is a pet adoption web application with a modern, mobile-first "Tinder-style" swiping interface.

## 🛠 Tech Stack

- **Svelte 5** (runes like `$state`)
- **Vite**
- **Tailwind CSS v4**
- **TypeScript**
- **Vitest** (for the autograder test runner)

## 🚀 How to Run the Project

Run these commands from this `app/` folder:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```

3. **Run Automated Tests:**
   ```bash
   npm test
   ```

4. **Build (Production):**
   ```bash
   npm run build
   ```

## 🐾 Features (Definition of Done)

- **Swipe Interface**: Swiping right "Likes" a pet (showing shelter details), and swiping left "Passes".
- **Filters (Type + Location)**: Dropdown filters show only pets that match the selected `type` and `location`.
- **API Integration**: Local JSON bios are merged with live images from the **Dog CEO API** (`https://dog.ceo/api/breeds/image/random`).
- **Zero-Latency Pre-fetching**: A FIFO buffer of 3 pets is kept ready (no loading between normal swipes).
- **Responsive Mobile-First UI**: Designed for a native-like mobile feel.
