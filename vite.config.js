const { resolve } = require('path')

module.exports = {
  // 导入别名
  alias: {
    '/@/': resolve(__dirname, 'src')
  },
  devtools: {}
}
