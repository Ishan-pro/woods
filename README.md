# Woods

A visual productivity tracker that turns focused work sessions into a growing forest.

Woods helps you track time in a more playful way: start a session, describe what you are working on, and plant a tree when you finish. Each tree represents a completed block of focused work, and the dashboard gives you a quick visual breakdown of where your time went.

https://github.com/user-attachments/assets/8626777d-1354-4455-b872-518712dc3b05

## Status

Currently under development. The core time-tracking flow is working, and the project is being improved with better persistence, analytics, and UI polish.

## Features

- Start and stop focused work sessions
- Add a label for each work session
- Plant a tree when a session is completed
- View completed sessions as a growing forest
- Open individual tree details to see what you worked on and for how long
- View a dashboard with a chart of time spent across tasks
- Built with a modern React, TypeScript, Redux, and Vite stack

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- React Redux
- React Router
- Chart.js
- React Chart.js 2
- Moment.js
- Vite
- ESLint

## Getting Started

### Prerequisites

Make sure you have Node.js and Yarn installed.

```bash
node --version
yarn --version
```

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Ishan-pro/woods.git
cd woods
yarn install
```

### Development

Start the local development server:

```bash
yarn dev
```

### Production Build

Create a production build:

```bash
yarn build
```

Preview the production build locally:

```bash
yarn preview
```

## Project Structure

```text
woods/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and SVG assets
│   ├── App.tsx          # Main forest/time-tracking view
│   ├── DetailView.tsx   # Dashboard and chart view
│   ├── reducers.ts      # Redux reducer and actions for trees
│   ├── store.ts         # Redux store setup
│   ├── main.tsx         # App entry point and routing
│   └── index.css        # Global styles
├── package.json
└── vite.config.ts
```

## How It Works

1. Enter what you are working on.
2. Click `Grow it` to start a focus session.
3. While a session is running, the button changes to `Burn it`.
4. Click `Burn it` if you want to cancel the active session without planting a tree.
5. Click `Done!` when the session is complete.
6. Woods plants a tree for that completed session.
7. Click a tree to view session details.
8. Open the dashboard to see time distribution across your work.

## Roadmap

- Persist sessions between browser refreshes
- Improve the timer implementation and session controls
- Add daily, weekly, and monthly productivity summaries
- Add editing and deleting for completed sessions
- Improve mobile responsiveness
- Add animations for planting and growing trees
- Add tests for time formatting, reducers, and core UI flows

## Development Notes

This project is intentionally small and focused, making it a good place to experiment with visual productivity interfaces, Redux state management, and dashboard-style data visualization.

## Author

Built by [Ishan Tiwari](https://github.com/Ishan-pro).
