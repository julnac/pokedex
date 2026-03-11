# ⚡ Next.js Advanced Pokédex

![Project Badge: Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Project Badge: React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Project Badge: CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Project Badge: API](https://img.shields.io/badge/PokéAPI-FFCB05?style=for-the-badge&logo=pokemon&logoColor=black)

A modern, highly interactive Pokémon Discovery & Comparison Web App. Built to demonstrate advanced state management, asynchronous data fetching strategies, and premium UI design implementation using vanilla CSS.

## 🌟 Live Demo

https://pokedex-ten-pink.vercel.app/

## 🚀 Key Features

* **Advanced Filtering & URL Synchronization**: Features a robust sidebar filter (by Type, Quantity, Sort Order) and search bar. Filter states are synchronized with URL query parameters (`?types=fire,flying&limit=50&sort=numerical`), allowing users to bookmark and share specific search states seamlessly.
* **Complex Data Aggregation**: The detailed Pokémon page combines data resolved concurrently from multiple REST endpoints (`/pokemon`, `/pokemon-species`, `/evolution-chain`), parsing deeply nested JSON to display stats, evolution paths, and species biology.
* **Persistent Cross-Component State**: Implemented a "Favorites" and "Comparison" system using `localStorage` mixed with JS Custom Events. This ensures that when a Pokémon is liked, the notification badge in the top navigation updates instantly across the app without requiring heavy global state libraries like Redux.
* **Floating Comparison Drawer**: A dynamic bottom-sheet layout that holds user-selected Pokémon, allowing for quick 1v1 comparisons.
* **Custom Notes System**: Included a local note-taking feature (CRUD) attached to specific Pokémon, utilizing forms with validation (`Formik`, `Yup`).
* **Premium Dark Mode UI**: Designed from scratch without component libraries (no Tailwind/MUI). Heavily utilizes CSS Grid, Flexbox, custom variables, and "Glassmorphism" effects for a highly polished, responsive, and animated user experience.

## 🛠️ Technical Decisions & Skills Demonstrated

As a Junior Frontend Developer, this project was built to tackle specific engineering challenges:

1. **Next.js App Router & Suspense**: Utilized the new React server components architecture alongside `use client` directives where interactivity was needed. Managed URL state safely within `<Suspense>` boundaries.
2. **API Performance**: Used `Promise.all` when fetching abilities and evolution chains to prevent network waterfalls and ensure the UI loads as quickly as possible.
3. **Vanilla CSS Architecture**: Instead of relying on CSS frameworks, the app uses a strict CSS Variable system (`--bg-color`, `--accent-primary`) for high maintainability and easy theming.
4. **Resilient Data Parsing**: Wrote custom recursive functions to traverse the unpredictable depth of PokéAPI's evolution tree to generate linear, renderable evolution paths.

## 💻 Running Locally

To run this project on your local machine:

```bash
# Clone the repository
git clone https://github.com/your-username/nextjs-pokedex.git

# Navigate into the directory
cd nextjs-pokedex

# Install dependencies
npm install

# Start the development server
npm run dev
# The app will be running at http://localhost:3000
```

## 📂 Project Structure Overview

```text
├── app/
│   ├── components/      # Reusable UI parts (Navigation, Sidebar, PokemonCard)
│   ├── pokemon/         # Pokémon Dashboard & List View
│   ├── compare/         # Dedicated 1v1 Comparison Route
│   ├── favorites/       # Liked Pokémon Route
│   ├── globals.css      # Core design system tokens
│   └── layout.js        # Root application wrapper
```

## 🤝 Contact

Created by [Julia Pozorska](https://www.linkedin.com/in/twoj-profil) - feel free to contact me!
