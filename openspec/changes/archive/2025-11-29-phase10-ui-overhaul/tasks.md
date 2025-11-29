## 1. Setup
- [x] 1.1 Install dependencies:
    - [x] `npm install -D tailwindcss postcss autoprefixer`
    - [x] `npx tailwindcss init -p`
    - [x] `npm install framer-motion clsx tailwind-merge lucide-react` (Lucide for icons).
    - [x] Uninstall `bootstrap react-bootstrap`.
- [x] 1.2 Configure Tailwind:
    - [x] Update `tailwind.config.js` to scan `src/**/*.{js,jsx,ts,tsx}`.
    - [x] Update `src/index.css` with Tailwind directives.

## 2. Component Redesign
- [x] 2.1 `Header.jsx`: Modern hero section with gradient text.
- [x] 2.2 `ScraperSection.jsx`: Clean card design, animated loading state.
- [x] 2.3 `LotterySection.jsx`: Styled inputs, toggles instead of checkboxes.
- [x] 2.4 `ParticipantsTable.jsx`: Modern table with sticky header and hover effects.
- [x] 2.5 `WinnersList.jsx`:
    - [x] Implement "Confetti" or "Reveal" animation.
    - [x] Card design for winners.

## 3. Logic Updates
- [x] 3.1 `App.jsx`: Update layout wrapper.
- [x] 3.2 `LotterySection.jsx`: Add "Drawing" state to trigger animations.

## 4. Build & Deploy
- [x] 4.1 Build React app.
- [x] 4.2 Copy to Spring Boot static resources.
