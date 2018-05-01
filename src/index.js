import './helpers/bootstrap'; 
const phantomjs = require('phantomjs-prebuilt'); 
const paths = {
    smokeTest: path.resolve(process.cwd(), 'src', 'scenarios', 'smoke.js')
}  
const globals = {
    baseUrl: process.env.baseUrl
};


utils.log("Opening test at "+paths.smokeTest+" and passing "+globals.baseUrl); 
var program = phantomjs.exec(paths.smokeTest, globals.baseUrl) 

program.stdout.pipe(process.stdout);
program.stderr.pipe(process.stderr);

program.on('exit', code => {
    // do something on end
    console.log("Done with phantomjs");
})