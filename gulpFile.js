const gulp = require('gulp')
const fs = require('fs')

const updateServerlessChrome = () => new Promise(resolve => {
    [
        `node_modules/@serverless-chrome/lambda/dist/bundle.cjs.js`,
        `node_modules/@serverless-chrome/lambda/dist/bundle.es.js`
    ].forEach(
        path => fs.writeFileSync(
            path,
            fs.readFileSync(path).
                toString()
                .replace(`, '--v=99'`, ``)
        )
    )

    return resolve()
})

gulp.task(`updateServerlessChrome`, gulp.parallel(updateServerlessChrome))
gulp.task(`default`, gulp.parallel(`updateServerlessChrome`))