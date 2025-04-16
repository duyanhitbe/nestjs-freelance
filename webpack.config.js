// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
	// Other Webpack configurations...
	resolve: {
		alias: {
			'@common': path.resolve(__dirname, 'libs/common/src'),
			'@core': path.resolve(__dirname, 'libs/core/src'),
			'@base': path.resolve(__dirname, 'libs/base/src'),
			'@modules': path.resolve(__dirname, 'libs/modules/src')
		},
		extensions: ['.ts', '.js', '.json'] // Support for these extensions
	},
	devtool: 'source-map'
};
