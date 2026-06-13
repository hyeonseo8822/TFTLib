import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 프로젝트 루트의 md 파일을 src/data/augments.js에서 ?raw로 import 하기 위해
  // 명시적으로 fs.allow에 루트를 포함합니다.
  server: {
    fs: {
      allow: ['.'],
    },
  },
})
