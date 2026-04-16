# PawsMatch 🐾

PawsMatch is a pet adoption web application with a modern, mobile-first "Tinder-style" swiping interface. 

## 🛠 Tech Stack

- **Svelte 5**: Utilizing the latest in Svelte reactivity (`$state`, `$derived`, etc.) for seamless performance and zero-latency UI updates.
- **Vite**: Blazing fast development server and production bundler.
- **Tailwind CSS v4**: Utility-first CSS framework with custom theme variables for clean, modern aesthetics.
- **TypeScript**: Ensuring end-to-end type safety.
- **Vitest**: Blazing fast unit test framework, paired with `@testing-library` for testing UI components.

## 🚀 How to Run the Project

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   This will start Vite on `http://localhost:5173`. Open this URL in your web browser.

3. **Run Automated Tests:**
   ```bash
   npm run test
   ```
   This uses Vitest to execute the required testing suites.

4. **Build and Preview (Production):**
   ```bash
   npm run build
   npm run preview
   ```

## 🐾 Features (Definition of Done)

- **Swipe Interface**: Swiping right "Likes" a pet (showing shelter details), and swiping left "Passes". Arrow keys (Right/Left) are also fully supported for desktop users.
- **API Integration**: Pet base data is loaded purely locally while real images are perfectly sourced from the **Dog CEO API** on-the-fly (`https://dog.ceo/api/breeds/image/random`).
- **Zero-Latency Pre-fetching**: The app implements a FIFO queue of 3 pets via `usePetStack.svelte.ts` taking advantage of hidden HTML images for background asset preloads.
- **Responsive Mobile-First UI**: Looks and feels exactly like an iOS or Android native application.

