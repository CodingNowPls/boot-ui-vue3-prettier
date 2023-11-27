import vue from '@vitejs/plugin-vue'
import setupExtend from 'unplugin-vue-setup-extend-plus/vite'
import createAutoImport, { createComponents } from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue(), setupExtend({})]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createSvgIcon(isBuild))
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins
}
