const path = require("path");
const  webpack = require("webpack");

//webpack property entry output and mode 
module.exports = {
    entry: './assets/js/script.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.bundle.js',
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    mode: 'development'
 };

