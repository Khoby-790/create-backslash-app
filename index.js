#!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
var execSync = require('child_process').execSync;



const makeModel = require('./libs/makemodel');
const makeController = require('./libs/makeController');




const commands = ['-h','--help','make:model','make:controller'];
const [,,...args] = process.argv

const emptyMessage = ['Sorry you didn\'t provide any arguments see --h for help','The right usage is:\n create-backslash-app [your app name]']

// var questions = [{
//   type: 'checkbox',
//   name: 'name',
//   choices:['create a project','update','make-model'],
//   message: "What would you have me do for you ?",
// }]

// inquirer.prompt(questions).then(answers => {
//   console.log(`creating ${answers['name']}!`)
// })

if(args.length < 1){
  console.log(emptyMessage.join('\n'));
}else{
  if(!commands.includes(args[0])){
    const appName = args[0];
    validateProjectName(appName)
    createProject(appName)
    process.exit(0);
  }else{
    switch(args[0]){
      case 'make:model':
          if(args[1].length > 3){
            let my_path = process.cwd() + '/app/Models';
            console.log("=====Creating Model =====");
            makeModel(my_path,args[1]);
          }else{
            console.log("Please provide an appopriate model name");
          }
        break;
      case 'make:controller':
        if(args[1].length > 3){
          let my_path = process.cwd() + '/app/Http/Controllers';
          console.log("=====Creating Controller =====");
          makeController(my_path,args[1]);
        }else{
          console.log("Please provide an appopriate controller name");
        }
        break;
      default:
        console.log(emptyMessage[o]);
        break;   
    }
  }
}


function validateProjectName(name) {
  if (!name.match(/^[$A-Z_][0-9A-Z_$]*$/i)) {
    console.error(
      '"%s" is not a valid name for a project. Please use a valid identifier ' +
        'name (alphanumeric).',
      name
    );
    process.exit(1);
  }

  if (name === 'Backslash'|| name === 'backslash') {
    console.error(
      '"%s" is not a valid name for a project. Please do not use the ' +
        'reserved word "%s".',
      name,
      name
    );
    process.exit(1);
  }
}

function createProject(name){
  execSync(`git clone https://github.com/Khoby-790/backslash-app-1.git ${name}`);
  if(process.platform.startsWith('win')){
   execSync(`cd ${name} && rd /S /Q .git`);
  //  console.log("Expected : "+output);
    execSync(`cd ${name} && npm i`);
  }else{
    execSync(`cd ${name} && rm -rf .git && npm i`);
  }
  console.log(`project ${name} is ready to work with \nHappy hacking!!!!`);
}