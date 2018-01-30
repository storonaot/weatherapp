const vars = require('./app/stylesheets/variables')

module.exports = {
  parser: 'sugarss',
  plugins: {
    precss: {},
    'postcss-svg': {
      paths: ['./app/images/icons'],
      ei: false,
      svgo: true
    },
    'postcss-size': {},
    'postcss-simple-vars': {
      variables: () => vars
    },
    'postcss-responsive-type': {}
  }
}
