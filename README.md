# nmss
nmss is yet another css framework to develop responsive apps, currently being developing as the base framework to feed all the fronts in Sportmaniacs.com

Pre-Alpha.

## Requirements
  nodejs

## How to use it
You have to create your own build to use nmss framework. First you need a theme that defines all the config variables. You can clone or npm install a prototype theme o create your own one. Then you just have to include the files into your sass project and import the files you want.

Relax, let's explain step by step:

### 1. Clone or npm install nmss framework

git
```
git clone https://github.com/nmss-framework/nmss.git
```

npm
```
npm install nmss
```

### 2. Clone, nmp install or create your own theme
git
```
git clone https://github.com/nmss-framework/nmss-theme-prototype.git
```

npm
```
npm install nmss-theme-prototype
```


TODO
Create your own theme 


### 3. Load nmss core and theme in your sass project.

You can add nmss core and one nmss theme in your `includePaths` so that you can import them in your project.


```javascript
// app.scss

@import "nmss-theme-prototype";
@import "nmss";
```


Gulp build using `gulp-sass`

```javascript
// gulpfile.js

gulp.task('sass', function () {
  gulp.src('src/scss/app.scss')
  .pipe(sass({
        outputStyle: 'compressed',
        errLogToConsole: true,
    includePaths: [
      'node_modules/nmss-theme-prototype/theme',
      'node_modules/nmss/src',
    ]
  }))
  .pipe(autoprefixer('last 2 version'))
  .pipe(gulp.dest('dist/css'));
});

```

Grunt build using `grunt-contrib-sass`

```javascript
// Gruntfile.js

sass: {
  dist: {
    options: {
        loadPath: [
            'node_modules/nmss-theme-prototype/theme',
            'node_modules/nmss/src'
        ]
    },
    files: {
      'dist/css/app.css': 'src/scss/app.scss'
    }
  }
}
```


But, If you prefer you can directly import the files in your main app scss file, as this:

```javascript
// app.scss

// load nmss theme
@import "../../node_modules/nmss-theme-prototype/theme/nmss-theme-prototype";
// load nmss framework
@import "../../node_modules/nmss/src/nmss";

// your scss
// ...

```