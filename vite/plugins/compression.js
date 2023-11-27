import compression from 'vite-plugin-compression'

export default function createCompression(env) {
  const { VITE_BUILD_COMPRESS } = env
  const plugin = []
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(',')
    if (compressList.includes('gzip')) {
      plugin.push(
        compression({
          // 生成文件后缀
          ext: '.gz',
          // 体积大于threshold则进行压缩，单位为b
          threshold: 1024 * 10,
          // 压缩后是否删除源文件
          deleteOriginFile: false,
        })
      )
    }
    if (compressList.includes('brotli')) {
      plugin.push(
        compression({
          // 生成文件后缀
          ext: '.br',
          // 压缩算法
          algorithm: 'brotliCompress',
          // 压缩后是否删除源文件
          deleteOriginFile: false,
        })
      )
    }
  }
  return plugin
}
