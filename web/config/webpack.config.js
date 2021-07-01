const configDir = __dirname

module.exports = (config) => {
  config.plugins.forEach((plugin) => {
    if (plugin.constructor.name === 'HtmlWebpackPlugin') {
      plugin.options.title = 'Đăng Ký TKH - Thiếu Nhi Gia Định'
    }
  })

  config.module.rules[0].oneOf[5] = {
    test: /\.css$/,
    sideEffects: true,
    use: [
      'style-loader',
      { loader: 'css-loader', options: { importLoaders: 1 } },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [require('tailwindcss'), require('autoprefixer')],
          config: {
            path: configDir,
          },
        },
      },
    ],
  }

  return config
}
