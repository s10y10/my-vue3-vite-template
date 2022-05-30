const { loadEnv } = require("vite");
const argv = require("minimist")(process.argv.slice(2));
const env = argv.env
  ? argv.env
  : loadEnv("", process.cwd()).VITE_APP_ENV || "test";

module.exports = env;
