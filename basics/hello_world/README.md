

## Happy World: React CRA Practice Project

A minimal **React application built with Create React App (CRA)**, customized only to **control the production build output path** and practice **deployment into a sibling folder**.

This project focuses on understanding **build mechanics**, not UI or feature complexity.

---

### Purpose

* Practice **CRA default lifecycle**
* Learn **custom build output path** using environment variables
* Deploy production files into a **sibling folder**
* Understand **source vs build separation**
* Keep configuration changes **minimal and intentional**

---

### Tech Stack

* **React 19**
* **Create React App (react-scripts 5.0.1)**
* **Webpack + Babel** (CRA default)
* **mathjs** (for computation experiments)
* **cross-env** (cross-platform env variable support)

---

### Folder Layout

```
Practice/
│
├── code/          # CRA source project
│   ├── src/
│   ├── public/
│   └── package.json
│
└── build/         # Production build output (sibling folder)
```

> The `build` folder is intentionally generated **outside** the project directory.

---

### ⚙️ Key Configuration Changes

#### `homepage`

```json
"homepage": "."
```

* Enables **relative asset paths**
* Allows the build to run correctly from any folder
* Required for non-root / static deployments

---

#### Custom Build Output Path

```json
"build": "cross-env BUILD_PATH=../build react-scripts build"
```

* Overrides CRA default `/build` directory
* Outputs production files directly into:

  ```
  ../build
  ```
* Works on **Windows, Linux, macOS**

---

### Project Lifecycle

#### Install Dependencies

```bash
npm install
```

---

#### Run Development Server

```bash
npm start
```

* URL: `http://localhost:3000`
* Hot reload enabled
* Used only for development

---

#### Create Production Build (Sibling Folder)

```bash
npm run build
```

Result:

```
Practice/
└── build/
    ├── index.html
    ├── static/
```

- Optimized
- Minified
- Production-ready

---

#### Test Production Build Locally

```bash
npx serve build
```

Open:

```
http://localhost:5000
```

This simulates **real production behavior**.

---

### What This Project Demonstrates

* CRA build pipeline understanding
* Environment-variable–driven configuration
* Clean separation of **source** and **deployment**
* Static-site–ready React build
* Industry-relevant frontend practice

---

### What This Project Does NOT Include

* No routing
* No custom Webpack config
* No eject
* No Vite
* No hosting provider integration
* No backend

*(Kept minimal on purpose)*

---

### Dependencies Overview

| Package           | Purpose                        |
| ----------------- | ------------------------------ |
| react / react-dom | Core React                     |
| react-scripts     | CRA build & dev tooling        |
| mathjs            | Math utilities for experiments |
| cross-env         | Cross-platform env variables   |
| testing-library   | Default CRA testing stack      |

---

### Practice Loop

```bash
npm run build
npx serve build
```

Repeat to reinforce **build → deploy → test** flow.

---

### Notes

* Designed for **learning and experimentation**
* Suitable for **interview preparation**
* Mirrors real-world frontend delivery patterns

---
