const Dotenv = require('dotenv-webpack')

/* const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path') */

module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/sass/app.scss";
        `
      }
    }
  },
  productionSourceMap: false,
  /* pluginOptions: {
     critical: {
       width: 375,
       height: 565
     }
   }, */
  configureWebpack: {
    plugins: [
      new Dotenv({
        systemvars: true
      })
      /* new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, 'src/index.html'),
          path.join(__dirname, 'src/!**!/!*.vue'),
          path.join(__dirname, 'src/!**!/!*.js')
        ])
      }) */
    ]
  },
  pwa: {
    name: 'Softfusion',
    themeColor: '#6164C1',
    msTileColor: '#6164C1'
  }
}
