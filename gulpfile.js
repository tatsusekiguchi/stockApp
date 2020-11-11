// gulpプラグインの読み込み
const gulp = require('gulp');
const rename = require('gulp-rename');
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass");
const pug = require('gulp-pug');
const browserSync = require('browser-sync');
const beautify = require('gulp-beautify');

// 環境毎に差し替えるJS
gulp.task('env-js-copy', function () {
    return gulp.src(['src/js/env/local.js'], { base: 'src' })   // ローカル環境用
    // return gulp.src(['src/js/env/dev.js'], { base: 'src' })       // 開発環境用
    // return gulp.src(['src/js/env/prd.js'], { base: 'src' })    // 本番環境用
        .pipe(rename('env-variables.js'))
        .pipe(gulp.dest('public/js/'));
});

// JS用
gulp.task('js-copy', function () {
    return gulp.src(
        ['src/js/*.js', '!src/js/*-env/*'],
        { base: 'src' }
    )
        .pipe(gulp.dest('public'));
});

// 画像用
gulp.task('image-copy', function () {
    return gulp.src(
        // ['src/image/*']
        ['src/image/**/*'],
        { base: 'src' }
    )
        .pipe(gulp.dest('public'));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./public",
            index: "index.html"
        }
    });
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

// Sassをコンパイルするタスクの設定
gulp.task("css", function () {
    return gulp.src('./src/sass/*.scss')// コンパイル対象のSassファイル
        .pipe(sass({
            outputStyle: 'expanded'
        })) // コンパイル実行
        //.pipe(autoprefixer()) // ベンダープレフィックスの付与
        // .pipe(gulp.dest('./public/css')).pipe(gulp.dest('./wp/css')); // 出力
        .pipe(gulp.dest('./public/css')); // 出力
    //.pipe(gulp.dest('./public/css')); // 出力
});

gulp.task("pug", function () {
    return gulp.src('./src/pug/pages/**/*.pug')// コンパイル対象のSassファイル
        .pipe(pug({
            pretty: true,
            basedir: './src/pug/'
        })) // コンパイル実行
        .pipe(beautify.html({ indent_size: 4, indent_with_tabs: true }))
        //.pipe(autoprefixer()) // ベンダープレフィックスの付与
        .pipe(gulp.dest('./public')); // 出力
});

gulp.task('watch', function () {
    // scssフォルダを監視し、変更があったらコンパイルする
    gulp.watch('./src/sass/**/*.scss', gulp.series('css'));
    gulp.watch(['./src/pug/**/*.pug'], gulp.series('pug'));
    gulp.watch('/src/js/*.js', gulp.series('js-copy'));
    gulp.watch('./public/**', gulp.series('reload'));
});

gulp.task('default', gulp.series(gulp.parallel(
    'watch', 'reload', 'browser-sync', 'js-copy', 'env-js-copy', 'pug', 'css', 'image-copy')));
