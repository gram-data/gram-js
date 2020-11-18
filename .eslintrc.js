module.exports = {
  "extends": [
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "settings": {
    "react": {
      "version": "999.999.999"
    }
  },
  "rules": {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["off"]
  }
}