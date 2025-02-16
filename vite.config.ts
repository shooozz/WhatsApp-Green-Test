import { createLogger, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const customLogger = () => {
  const baseLogger = createLogger();
  const originalInfo = baseLogger.info;

  let hasAddedCustomMessage = false;

  baseLogger.info = (msg, options) => {
    originalInfo(msg, options);

    if (!hasAddedCustomMessage) {
      hasAddedCustomMessage = true;
      setTimeout(() => {
        originalInfo(
          `
   ___  ___  ________   
  |\\  \\|\\  \\|\\   __  \\  
  \\ \\  \\\\\\  \\ \\  \\|\\  \\ 
   \\ \\  \\\\\\  \\ \\   ____\\
    \\ \\  \\\\\\  \\ \\  \\___|
     \\ \\_______\\ \\__\\   
      \\|_______|\\|__|   
          `,
          options
        );
      }, 500);
    }
  };

  return baseLogger;
};

export default defineConfig({
  customLogger: customLogger(),
  server: {
    port: 3000
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material']
  }
});
