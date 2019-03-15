module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  },
  "globals": {
    state: true,
    fetch: true,
  },
  "rules": {
    "camelcase": 0,
    "global-require": 0,
    "class-methods-use-this": 0,
    "import/no-extraneous-dependencies": 0,
    "max-len": 0,
    "react/jsx-no-bind": 0,
    "react/prefer-stateless-function": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-uses-vars": 1,
    "no-unused-vars": "warn",
    "no-console": "warn",
    "no-unexpected-multiline": "warn",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-use-before-define": 0,
    "import/prefer-default-export": 0,
  },
};
