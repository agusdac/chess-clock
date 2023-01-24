const appJson = require('./app.json')
const fs = require('fs')

let versionDigits = appJson.expo.version.split('.')

appJson.expo.version = `${versionDigits[0]}.${(Number(versionDigits[1] + 1))}.${versionDigits[2]}`
appJson.expo.android.versionCode = appJson.expo.android.versionCode + 1

fs.writeFile("app.json", JSON.stringify(appJson, null, 2), function (err) {
    if (err) {
        console.log(err);
    }
});