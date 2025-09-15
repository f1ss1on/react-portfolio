
# Riad Kilani React Portfolio

Modern, responsive portfolio and project gallery for Riad Kilani, built with React, Vite, and Bootstrap. This site showcases web development, UI/UX, and design projects with a focus on clean code, performance, and maintainability.

## Features

- **React + Vite**: Fast, modern frontend stack with hot module reload
- **Responsive Design**: Mobile-first, flexible layouts using SCSS and Bootstrap
- **Project Gallery**: Dynamic project modals with multi-image and multi-paragraph support
- **Admin Project Form**: HTML/JS tool for generating new project JSON
- **FontAwesome Icons**: Rich iconography for tech stacks and UI
- **Image Gallery Tabs**: Organized project, mockup, and design galleries
- **SCSS Architecture**: Modular, maintainable, and fully nested styles

## Demo

Live: [https://riadkilani.com/](https://riadkilani.com/)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone https://github.com/f1ss1on/react-portfolio.git
cd react-portfolio
npm install
```

### Development

```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production

```bash
npm run build
```
Output will be in the `dist/` folder.

### Linting

```bash
npm run lint
```

## Project Structure

- `src/components/portfolio/` — Portfolio, modal, and project data
- `src/admin/project-form.html` — Admin form for generating project JSON
- `src/scss/` — Modular SCSS styles
- `public/` — Static assets and images

## Adding Projects

Use the admin form at `src/admin/project-form.html` to generate new project JSON. Paste the output into `src/components/portfolio/projects.js`.

## Technologies Used

- React
- Vite
- Bootstrap 5
- SCSS
- FontAwesome
- Gulp (for CSS build)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License


Copyright © 2025 Riad Kilani. All rights reserved.

Unauthorized copying, distribution, modification, or use of this software, in whole or in part, is strictly prohibited without the express written permission of the copyright holder. This software and its associated documentation files are protected by international copyright laws and treaties. Any unauthorized use may result in civil and criminal penalties to the fullest extent permitted by law.

---

**Riad Kilani** — [riadkilani.com](https://riadkilani.com/) | [@f1ss1on](https://github.com/f1ss1on)
