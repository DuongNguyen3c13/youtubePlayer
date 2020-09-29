const path = require('path');
const fs = require('fs-extra');

//copy built assets
fs.emptyDirSync('../public/static');
fs.copySync('build/static', '../public/static');
// fs.copySync('build/assets', '../public/assets');
fs.copySync('build/static/js', '../public/js');
fs.copySync('build/static/css', '../public/css');
fs.copySync('build/static/media', '../public/css/media');

//create symlink to main js
const contents = fs.readFileSync('build/asset-manifest.json');
const jsonContent = JSON.parse(contents);

// const baseIndex = keys.indexOf('runtime~main.js');

const startJs = jsonContent['entrypoints'][2];
// //css js
fs.copySync('build'+ jsonContent['files']['main.css'], path.resolve('../public/css/main.css'));
// // fs.copySync('build'+ jsonContent['files'][keys[baseIndex+2]], path.resolve('../public/css/start.css'));
fs.copySync('build'+ jsonContent['files']['main.js'], path.resolve('../public/js/main.js'));
fs.copySync('build'+ jsonContent['files'][startJs], path.resolve('../public/js/start.js'));
fs.copySync('build'+ jsonContent['files']['runtime-main.js'], path.resolve('../public/js/runtime~main.js'));


