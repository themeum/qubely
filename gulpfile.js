const { src, dest, series } = require('gulp');
const zip = require('gulp-zip');
const replace = require('gulp-replace');
const clean = require('gulp-clean');
const minifyCSS = require('gulp-csso');
const minifyJS = require('gulp-minify');
const concatCss = require('gulp-concat-css')

function cleanBuild() {
    return src('./build', {read: false, allowEmpty: true})
        .pipe(clean());
}

function cleanZip() {
    return src('./qubely.zip', {read: false, allowEmpty: true})
        .pipe(clean());
}

function makeBuild() {
    return src([
        './**/*.*',
        '!./build/**/*.*',
        '!./assets/reactjs/**/*.*',
        '!./assets/js/qubely.dev.js.map',
        '!./assets/js/qubely.dev.js',
        '!./assets/js/jquery.magnific-popup.js',
        '!./node_modules/**/*.*',
        '!./**/*.zip',
        '!./gulpfile.js',
        '!./readme.md',
        '!./LICENSE.txt',
        '!./package.json',
        '!./package-lock.json',
    ]).pipe(dest('build/qubely/'));
}

function productionMode() {
    return src(['./build/qubely/core/QUBELY.php'])
        .pipe(replace(/qubely.dev.js/g, 'qubely.min.js'))
        .pipe(replace(/common-script.js/g, 'common-script.min.js'))
        .pipe(replace(/(?<=#START_REPLACE)([^]*?)(?=#END_REPLACE)/g, 'wp_enqueue_style(\'qubely-bundle\', QUBELY_DIR_URL . \'assets/css/qubely.bundle.min.css\', false, QUBELY_VERSION);'))
        .pipe(dest('./build/qubely/core/'));
}

function gulpConcatCss() {
    return src([
        './build/qubely/assets/css/animation.css',
        './build/qubely/assets/css/magnific-popup.css',
        './build/qubely/assets/css/qubely.animatedheadline.css',
    ])
        .pipe(concatCss('qubely.bundle.css'))
        .pipe(dest('./build/qubely/assets/css/'))
}

function minify_css() {
    return src(['./build/qubely/assets/css/*.css'])
        .pipe(minifyCSS())
        .pipe(dest('./build/qubely/assets/css/'));
}

function minify_js() {
    return src(['./build/qubely/assets/js/*.js'])
        .pipe(minifyJS({
            ext:{
                src:'.js',
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['qubely.min.js', '*-min.js', '*.min.js']
        }))
        .pipe(dest('./build/qubely/assets/js/'));
}

function removeJsFiles() {
    return src(['./build/qubely/assets/js/common-script.js'], {read: false, allowEmpty: true})
        .pipe(clean());
}

function makeZip() {
    return src('./build/**/*.*')
        .pipe(zip('qubely.zip'))
        .pipe(dest('./'))
}

exports.makeBuild = makeBuild;
exports.productionMode = productionMode;
exports.gulpConcatCss = gulpConcatCss;
exports.minify_css = minify_css;
exports.minify_js = minify_js;
exports.cleanBuild = cleanBuild;
exports.cleanZip = cleanZip;
exports.removeJsFiles = removeJsFiles;
exports.makeZip = makeZip;
exports.default = series(cleanBuild, cleanZip, makeBuild, productionMode,gulpConcatCss, minify_css, minify_js, removeJsFiles, makeZip, cleanBuild);