const path = require("path");
const  webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

//webpack property entry output and mode 
module.exports = {
    //entry is the source for our webpack bundle 
   entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js"
   },
    //tell webpack where to spit the output out to 
    output: {
        //this creates a directory for the bundle 
        path: path.join(__dirname, 'dist'),
        //filename can be anything you want it to be 
        //create a series of bundled files one for each listing in the entry object 
        filename: '[name].bundle.js',
    },
    //this object identifies the type of files to pre process with the file-loader package
    //it uses the test property to find a regex trying to find any file with a jpg extentsion
    module: {
        rules: [
            {
                test: /\.jpg$/i,
                //use esmodule false to prevent default behavior of file loader
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name (file) {
                                return "[path][name].[ext]"
                            },
                            //saves them in assets folder
                            publicPath: function(url) {
                                return url.replace("../", "/assets")
                            }
                        }
                    },
                    {
                        //npm package that is an image optimizer loader file loader emiiteed images without reducing size so this will do that 
                        //try to optimize images in rpoduction because it can lead to a longer build time aka save it for last 
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
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

