// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),
//     tailwindcss(),
//   ],
//      server: {
//     host: '0.0.0.0', // allow external access
//     port: 5173,      // use the same port as your ngrok tunnel
//     strictPort: false,
//     allowedHosts: ['all'], // allow any hostname (best for ngrok)
//   },
// })


// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'EvatrilNavbar',
      fileName: (format) => `evatril_navbar.${format}.js`,
    },
    rollupOptions: {
      // Make sure to externalize dependencies
      external: ['react', 'react-dom', 'react-router-dom'],
    },
  },
});

