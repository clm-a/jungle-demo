const { environment } = require('@rails/webpacker')

module.exports = environment

// Babel actioncable transpilation issue
environment.loaders.delete('nodeModules')