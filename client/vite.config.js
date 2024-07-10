// vite.config.js
import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  optimizeDeps: {
    include: ['react-quill'], // Ensure react-quill is included in optimized dependencies
  },
};
