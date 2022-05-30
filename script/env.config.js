const fs = require("fs");
const { npm_config_env } = process.env;

const envConfig = {
  local: {
    VITE_APP_ENV: "local",
    VITE_APP_HOST: "https://www.***.test.net",
  },
  dev: {
    VITE_APP_ENV: "dev",
    VITE_APP_HOST: "https://www.***.test.net",
  },
  test: {
    VITE_APP_ENV: "test",
    VITE_APP_HOST: "https://www.***.test.net",
  },
  staging: {
    VITE_APP_ENV: "staging",
    VITE_APP_HOST: "https://www.***.staging.net",
  },
  production: {
    VITE_APP_ENV: "production",
    VITE_APP_HOST: "https://www.***.com",
  },
};

const env = npm_config_env || "local";
const envData = envConfig[env];
const fileName = ".env";
fs.writeFileSync(fileName, "", { flag: "w" });
for (const key in envData) {
  const line = `${key}=${envData[key]}\n`;
  fs.appendFileSync(fileName, line);
}
