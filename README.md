# Focus Tracker

A Pomodoro-style productivity application built with React and Tailwind CSS. Focus Tracker helps users manage tasks, track focus sessions, and monitor their productivity.

This project was developed during my front-end development training at Mastery Hub Rwanda in September 2026.

## Live Demo

[Try Focus Tracker](https://focus-tracker-phi.vercel.app/)

## Features

- Pomodoro-style focus timer
- Start, pause, resume, and reset functionality
- Task creation, deletion, and completion
- Automatic logging of completed focus sessions
- Focus session history
- Productivity statistics
- Persistent tasks and session history using localStorage
- Light and dark mode
- Global state management

## Technologies Used

- React
- JavaScript
- Tailwind CSS
- Vite
- Web Storage API (localStorage)
- Git and GitHub
- Vercel

## Getting Started

Clone the repository:

```bash
git clone https://github.com/morgizo21/focus-tracker.git
```

Navigate to the project directory:

```bash
cd focus-tracker
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Project Structure

    src/
    ├── components/
    │   └── TaskItem.jsx
    ├── context/
    │   ├── TasksContext.jsx
    │   └── ThemeContext.jsx
    ├── hooks/
    │   ├── useLocalStorage.js
    │   └── useTimer.js
    ├── App.jsx
    ├── index.css
    └── main.jsx

## Concepts Practiced

- React functional components
- Context API
- State management with useReducer
- State and side effects with useState and useEffect
- Reference management with useRef
- Performance optimization with useMemo, useCallback, and React.memo
- Custom React hooks
- Timer and interval management
- Persistent data storage
- Component-based architecture
- Separation of concerns

## Author

Morgan Ntare
