import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Загружаем .env из ../ при запуске через npm
  const env = loadEnv(mode, "../", "");

  return {
    server: {
      port: Number(env.VITE_CLIENT_PORT) || 5173,
      host: true,
      watch: {
        usePolling: true, // Для HMR в Docker
        interval: 1500,
      },
    },
  };
});
