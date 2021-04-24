import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

/*
 In Vite's current version (v2.1.2): 
 Uncaught ReferenceError: window is not defined is raised on page load when using monaco editor.
 So build.rollupOptions.output.manualChunks needs to be added until the issue is fixed.
 See: https://github.com/vitejs/vite/issues/1927#issuecomment-805803918
*/
const prefix = `monaco-editor/esm/vs`;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          jsonWorker: [`${prefix}/language/json/json.worker`],
          cssWorker: [`${prefix}/language/css/css.worker`],
          htmlWorker: [`${prefix}/language/html/html.worker`],
          tsWorker: [`${prefix}/language/typescript/ts.worker`],
          editorWorker: [`${prefix}/editor/editor.worker`],
        },
      },
    },
  },
})
