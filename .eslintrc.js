module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "space-before-function-paren": 0,
    quotes: "off",
    semi: "off",
    "comma-dangle": "off",
  },
};
