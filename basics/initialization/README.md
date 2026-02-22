
# React Practice Project (CRA)

A clean reference for initializing and stripping down a standard `create-react-app` project.

---

## 1. Initialization

To start a new project from scratch:

```bash
npx create-react-app my-app
cd my-app
npm start

```

---

## 2. Restart & Recovery

If you receive the error **"'react-scripts' is not recognized"**, it means your local dependencies are missing or corrupted. Use these steps to reset the environment:

### Quick Fix

Install the missing `node_modules` based on your `package.json`:

```bash
npm install

```

### Full Environment Reset

If the quick fix fails, perform a clean reinstall:

```bash
rd /s /q node_modules
del package-lock.json
npm install
npm start

```

---

## 3. The Cleanup Reference

CRA comes with several files that clutter the `src` folder. Follow these steps to reach a "Base State."

### Step A: File Deletion

Delete the following files from the `src/` directory:

* `App.css`
* `App.test.js`
* `index.css`
* `logo.svg`
* `reportWebVitals.js`
* `setupTests.js`

### Step B: Reset `src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```

### Step C: Reset `src/App.js`

```javascript
function App() {
  return (
    <div>
      <h1>Project Starter</h1>
    </div>
  );
}

export default App;

```

---

## 4. Scripts Reference

| Command | Action |
| --- | --- |
| `npm start` | Runs the app in development mode at `http://localhost:3000` |
| `npm run build` | Bundles the app into the `build` folder for production |
| `npm test` | Launches the interactive test runner |
| `npm run eject` | **One-way operation.** Removes the single-build dependency and copies config files |

---

## 5. Key Dependencies

* **React 19**: The latest version of the React library.
* **React Scripts**: Manages the build configurations (Webpack, Babel, etc.).
* **Testing Library**: Included by default for unit and integration testing.

---
