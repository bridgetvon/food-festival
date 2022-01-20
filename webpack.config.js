const path = require("path");
const  webpack = require("webpack");
const { BundleAnalyzerPlugin  }= require("webpack-bundle-analyzer");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const webpackPwaManifest = require("webpack-pwa-manifest");

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
        }),
        //remember the new keyword invokes a constructor function 
        new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events",
            //start url is the homepage for our pwa 
            start_url: "../index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            //fingerprints tell webpack whether or not it should generate a unique fingerprints so that each time a new manifest is generated
            //it looks like this : manifest.lhge325d.json
            fingerprints: false,
            //inject determines whether the link to the manifest.json is added to the html
            inject: false,
            icons: [{
                src: path.resolve("assets/img/icons/icon-512x512.png"),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join("assets", "icons")
            }]
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, ''),
        },
    },
    mode: 'development'
 };

