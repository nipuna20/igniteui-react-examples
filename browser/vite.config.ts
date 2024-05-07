import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {    
    open: true,
    port: 4200
  },
  optimizeDeps: {
    include: ["react-dom"],
  },
  build: {
    outDir: "build",
    commonjsOptions: {
      include: [/node_modules/], 
      extensions: ['.js', '.cjs'], 
      transformMixedEsModules: true,
    },
    rollupOptions: {
      cache: false,
      output: {
        manualChunks: {
          igniteuiCharts: ["igniteui-react-charts"],
          igniteuiCore: ["igniteui-react-core"],
          igniteuiReact: ["igniteui-react"],
          igniteuiGauges: ["igniteui-react-gauges"],
          igniteuiGrids: ["igniteui-react-grids"],
          igniteuiInputs: ["igniteui-react-inputs"],
          igniteuiLayouts: ["igniteui-react-layouts"],
          igniteuiMaps: ["igniteui-react-maps"],
          igniteuiExcel: ["igniteui-react-excel"],
          igniteuiSpreadsheet: ["igniteui-react-spreadsheet"],
          igniteuiSpreadsheetChartAdapter: ["igniteui-react-spreadsheet-chart-adapter"],
          igniteuiDataSources: ["igniteui-react-datasources"],
          igniteuiDockmanager: ["igniteui-dockmanager"],
        },
        sourcemapIgnoreList: (relativeSourcePath) => {
          const normalizedPath = path.normalize(relativeSourcePath);
          return normalizedPath.includes("node_modules");
        },
      }
    }
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
  ],
})