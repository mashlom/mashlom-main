# MASHLOME.ME main

This repository contains two parts: Old apps based on angular, and a new,
SPA app based on React.

The old apps are located under /apps and /[hospital name]. The react
sits under /src, as usual.

The github action builds the React app, and copy the old apps, for backward
compatibility.
Once the migration is done, we will delete the old apps.

## Github Pages and SPA
Github Pages doesn't support single page application, i.e. it doesn't capable of routing
all resources to the root index.html.
That's one of the reasons why we created the angularjs in the first place -
it was easier to create standalone html pages.

Now that we moved to React, we use the # sign as a way to do the routing.

During the migration to react, we will use iframe to show the old apps.

## Start a local server for the angular apps

```
npm install
python -m http.server
```

Then, you can browse to http://localhost:8000 (/apps, /kaplan...)


To run the test, use this command:

```
npm test
```

## React app

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
