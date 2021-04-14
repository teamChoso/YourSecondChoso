module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  jest: {
    transform: {
      ".*\\.(js)$": "babel-jest",
    },
  },
};
