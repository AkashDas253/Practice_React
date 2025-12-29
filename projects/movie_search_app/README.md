
# Movie Search App

This project is a simple Movie Search application that allows users to search for movies and view details such as title, year, and poster. It provides an easy-to-use interface for exploring movie information.

## Features

- Search for movies by title
- View movie details (title, year, poster)
- Responsive design for desktop and mobile

## Project Structure

The project is organized to keep the source code and production builds separate:

- **code/** — Contains the React source code, `package.json`, and logic.
- **build/** — The production-ready folder (located outside the `code` folder).
- **src/** — Component logic and UI styles.

## Environment Variables

This app requires one API key to fetch movie data. 

1. Create a `.env` file inside the `code/` directory.
2. Add your key using the required prefix:
   `REACT_APP_MOVIE_API_KEY=your_api_key_here`

*Note: This key is embedded into the build at build-time. Ensure you apply domain restrictions in your API provider's dashboard for security.*

## Getting Started

### 1. Installation
Navigate into the code directory and install the necessary tools:
```bash
cd code
npm install

```

### 2. Building the Project

To generate the production build into the `../build` folder, run:

```bash
npm run build

```

### 3. Previewing the Build

To test the production files locally:

```bash
cd ../build
npx serve -s .

```

## How to Use

1. Enter a movie title in the search field and click "Search".
2. Browse the list of results and click on a movie to view more details.

## Contributing

Contributions and suggestions are welcome! Please open an issue or submit a pull request for improvements.

---
