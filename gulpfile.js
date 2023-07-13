const { src, dest, series } = require('gulp');
const zip = require('gulp-zip');
const replace = require('gulp-replace');
const clean = require('gulp-clean');
const minifyCSS = require('gulp-csso');
const minifyJS = require('gulp-minify');
const concatCss = require('gulp-concat-css');
const merge = require('merge-stream');

function cleanBuild() {
    return src('./build', { read: false, allowEmpty: true })
        .pipe(clean());
}

function cleanZip() {
    return src('./qubely.zip', { read: false, allowEmpty: true })
        .pipe(clean());
}

function makeBuild() {
    return src([
        './**/*.*',
        '!./build/**/*.*',
        '!./assets/reactjs/**/*.*',
        '!./assets/js/qubely.dev.js.map',
        '!./assets/js/qubely.dev.js',
        '!./assets/css/animation.css',
        '!./assets/css/magnific-popup.css',
        '!./assets/css/qubely.animatedheadline.css',
        '!./node_modules/**/*.*',
        '!./docs/**/*.*',
        '!./**/*.zip',
        '!./gulpfile.js',
        '!./readme.md',
        '!./changelog.md',
        '!./LICENSE.txt',
        '!./package.json',
        '!./package-lock.json',
        '!./yarn.lock',
    ]).pipe(dest('build/qubely/'));
}

function productionMode() {
    const replacement_string = '\n\t\t\twp_enqueue_style(\'qubely-bundle\', QUBELY_DIR_URL . \'assets/css/qubely.bundle.min.css\', false, QUBELY_VERSION);\n\t\t\t';
    return src(['./build/qubely/core/QUBELY.php'])
        .pipe(replace(/(?<=#START_REPLACE)([^]*?)(?=#END_REPLACE)/g, replacement_string))
        .pipe(replace(/qubely\.dev\.js/g, 'qubely.min.js'))
        .pipe(replace(/jquery\.animatedheadline\.js/g, 'jquery.animatedheadline.min.js'))
        .pipe(replace(/map\.js/g, 'map.min.js'))
        .pipe(replace(/qubely\.magnific-popup\.js/g, 'qubely.magnific-popup.min.js'))
        .pipe(replace(/contactform\.js/g, 'contactform.min.js'))
        .pipe(replace(/image-comparison\.js/g, 'image-comparison.min.js'))
        .pipe(replace(/interaction\.js/g, 'interaction.min.js'))
        .pipe(replace(/common-script\.js/g, 'common-script.min.js'))
        .pipe(dest('./build/qubely/core/'));
}

function gulpConcatCss() {
    return src([
        './assets/css/animation.css',
        './assets/css/magnific-popup.css',
        './assets/css/qubely.animatedheadline.css',
        './assets/css/style.min.css',
    ])
        .pipe(concatCss('qubely.bundle.min.css'))
        .pipe(dest('./build/qubely/assets/css/'))
}

function minify_css() {
    return src(['./build/qubely/assets/css/*.css'])
        .pipe(minifyCSS())
        .pipe(dest('./build/qubely/assets/css/'));
}

function minify_js() {
    const commonjs = src(['./build/qubely/assets/js/*.js'])
        .pipe(minifyJS({
            ext: {
                src: '.js',
                min: '.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['qubely.min.js', '*-min.js', '*.min.js']
        }))
        .pipe(dest(['./build/qubely/assets/js/']));

    const blocksjs = src(['./build/qubely/assets/js/blocks/*.js'])
        .pipe(minifyJS({
            ext: {
                src: '.js',
                min: '.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['qubely.min.js', '*-min.js', '*.min.js']
        }))
        .pipe(dest(['./build/qubely/assets/js/blocks/']));

    return merge(commonjs, blocksjs);
}

function removeJsFiles() {
    return src([
        './build/qubely/assets/js/common-script.js',
        './build/qubely/assets/js/interaction.js',
        './build/qubely/assets/js/jquery.animatedheadline.js',
        './build/qubely/assets/js/qubely.magnific-popup.js',
        './build/qubely/assets/js/blocks/contactform.js',
        './build/qubely/assets/js/blocks/map.js',
        './build/qubely/assets/js/blocks/image-comparison.js',
    ],
        { read: false, allowEmpty: true })
        .pipe(clean());
}
function removeCSSFiles() {
    return src([
        // './build/qubely/assets/css/style.min.css',
    ],
        { read: false, allowEmpty: true })
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
// exports.removeCSSFiles = removeCSSFiles;
exports.makeZip = makeZip;
exports.default = series(cleanBuild, cleanZip, makeBuild, productionMode, gulpConcatCss, minify_css, minify_js, removeJsFiles, makeZip, cleanBuild);
