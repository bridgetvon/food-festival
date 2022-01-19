const path = require("path");
const  webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

//webpack property entry output and mode 
module.exports = {
    //entry is the source for our webpack bundle 
    entry: './assets/js/script.js',
    //tell webpack where to spit the output out to 
    output: {
        //this creates a directory for the bundle 
        path: path.join(__dirname, 'dist'),
        //filename can be anything you want it to be 
        filename: 'main.bundle.js',
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", //report outputs to an HTML file in the dist folder
        })
    ],
    mode: 'development'
 };

