# nmss
nmss is yet another css framework to develop responsive apps, currently being developing as the base framework to feed all the fronts in Sportmaniacs.com



Pre-Alpha.

## Requirements
  nodejs

## How to use it
You have to create your own build to use nmss framework. First you need a theme that defines all the config variables. You can clone or npm install a prototype theme o create your own one. Then you just have to include the files into your sass project and import the files you want.

Relax, let's explain step by step:

1. Clone or npm install nmss framework

git
```
git clone https://github.com/rlucha/nmss.git
```

npm
```
npm install nmss
```

2. Clone, nmp install or create your own theme
git
```
git clone https://github.com/rlucha/nmss.git
```

npm
```
npm install nmss
```

Create your own theme 
TODO

3. Load nmss core and theme in your sass project.

You have to add nmss core and one nmss theme in your `includePaths` so that you can import them in your project.

app.scss

```
@import "nmss-theme-prototype";
@import "nmss";
```


Gulp build using `gulp-sass`

```javascript
gulp.task('sass', function () {
    gulp.src('src/scss/app.scss')
      .pipe(sass({
        includePaths: [
            //'node_modules/nmss-theme-sportmaniacs',
            //'node_modules/nmss/src',
            '../nmss/src',
            '../nmss-theme-prototype'
        ]
      }))
      .pipe(gulp.dest('dist/css'))
});
```

Grunt build using `grunt-contrib-sass`

```javascript
sass: {
  dist: {
    options: {
        loadPath: [
            //'node_modules/nmss-theme-sportmaniacs',
            //'node_modules/nmss/src',
            '../nmss/src',
            '../nmss-theme-prototype'
        ]
    },
    files: {
      'dist/css/app.css': 'src/scss/app.scss'
    }
  }
}
```
