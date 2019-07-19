const path = require('path');
const fs = require('fs');

module.exports = function(pathname,controllername){
        const fileName = controllername.charAt(0).toUpperCase() + controllername.slice(1);
        if(fs.existsSync(`${pathname}/${controllername.toLowerCase()}.js`)){
            console.log(`Controller ${fileName}Controller already exits`);
            return;
        }

        const file = fs.readFileSync(path.dirname(__dirname) + "/libs/controller.txt",'utf8');
        let fileContent = file.split("Controller").join(`${fileName}Controller`);
        //console.log(fileContent);
        fs.writeFile(`${pathname}/${fileName}Controller.js`,fileContent,function(err){
            if(err) throw err
            console.log('Model Successfully Created');
        })
}