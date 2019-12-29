const { watch, series, src, dest } = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');

const base_src = 'src/';
const base_dest = '/var/www/html/public_html/wp-content/themes/<themefolder>/';

function css(cb){
    const plugins = [
        tailwindcss,
        autoprefixer
    ]
    return src( base_src + 'css/styles.css' )
        .pipe(postcss(plugins))
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe( dest(base_dest + '<cssfolderdest>') );
}

exports.default = function(){
    watch('src/css/*.css', series(css));
};
