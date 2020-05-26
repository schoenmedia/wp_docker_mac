const { parallel, src, dest, watch, series } = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglifyes = require('uglify-es');
const uglify_composer = require('gulp-uglify/composer');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefix = require('autoprefixer');
const postcss = require('gulp-postcss');
const del = require('del');
const webpack = require('webpack-stream');
const webpack_compiler = require('webpack');
const theme_path = '../public_html/wp-content/themes/shoplab/'
const theme_js_dir = 'js/'  

const minifyjs = uglify_composer(uglifyes,console);


function css() {
  // body omitted
    return src('src/style/style.scss')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compressed',sourceComments: false}))
        .pipe(postcss([autoprefix()]))
        .pipe(dest(theme_path));
}


function jsTranspile(){
  return src('src/javascript/main.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write(theme_path+theme_js_dir+'maps'))
        .pipe(dest('temp')); 
}


function jsMinify(){
  return src('temp/main.js')
        .pipe(sourcemaps.init())
        .pipe(minifyjs())
        .pipe(sourcemaps.write(theme_path+theme_js_dir+'maps'))
        .pipe(dest('temp'));  
}


function jsWebpack(){
  return src('src/javascript/main.js')
      .pipe(webpack({
          output: {filename: 'main.js'},
          module: {
            rules: [
                    /**
                    * Babel on js files.
                    */  
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
            ]
        }
      }, webpack_compiler, function(err, stats) {
        /* Use stats to do more things if needed */
      }))
      .pipe(dest('temp'));
}




function cleanTemp(){
  return del(['temp']);
}


function jsTransferForDev(){
  return src('temp/main.js')
      .pipe(dest(theme_path+theme_js_dir))

}

function jsTransferForProd(){
  return src('temp/main.min.js')
      .pipe(dest(theme_path+theme_js_dir))
}


function watchFiles(){
    watch("src/style/**/*", css);
    watch("src/javascript/*.js", dev_js);
}



const dev_js = series(
  jsWebpack,
  jsTransferForDev,
  cleanTemp
);


const watching = parallel(watchFiles);

exports.build = parallel(css);
exports.watching = watching;
