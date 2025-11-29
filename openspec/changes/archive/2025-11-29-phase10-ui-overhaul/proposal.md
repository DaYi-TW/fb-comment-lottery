# Change: Phase 10 - Modern UI with Tailwind & Animations

## Why
The current Bootstrap UI is functional but generic. The user requested a "very beautiful UI" with Tailwind CSS and animations for the lottery draw to enhance the user experience and visual appeal.

## What Changes
- **Styling Engine:** Replace Bootstrap with **Tailwind CSS**.
- **Animations:** Add **Framer Motion** for smooth transitions and a "Slot Machine" or "Shuffle" effect during the winner selection.
- **Design:**
    - Modern, clean aesthetic (gradients, shadows, rounded corners).
    - Responsive layout.
    - Interactive states (hover effects).
- **Components:** Completely rewrite React components to use Tailwind utility classes.

## Impact
- **Affected Code:** `frontend/**`
- **Dependencies:** Add `tailwindcss`, `postcss`, `autoprefixer`, `framer-motion`, `clsx`, `tailwind-merge`.
- **Removed:** `bootstrap`, `react-bootstrap`.
