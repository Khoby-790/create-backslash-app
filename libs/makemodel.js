const fs = require('fs');
const path = require('path');

module.exports = function(pathname,name){
    if(fs.existsSync(`${pathname}/${name.toLowerCase()}.js`)){
            console.log(`the model ${name} already exists`);
            return;
    }else{
        const file = fs.readFileSync(path.dirname(__dirname) + "/libs/model.txt",'utf8')
        let fileName = name.charAt(0).toUpperCase() + name.slice(1);
        let fileContent = file.split("ModelName").join(name.charAt(0).toUpperCase(fileName) + name.slice(1));
        //console.log(fileContent);
        fs.writeFile(`${pathname}/${fileName}.js`,fileContent,function(err){
            if(err) throw err
            console.log('Model Successfully Created');
        })
    }

}

