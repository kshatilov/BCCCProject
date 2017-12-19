var path = require('path');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/client/scripts/entry.jsx')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader", query: {plugins: ['transform-runtime'],presets: ['es2015', 'stage-0', 'react'],}},
            {test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader"},
            {test: /\.json$/, exclude: /node_modules/, loader: 'json-loader'}

        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    }
};
