#!/usr/bin/env node

const chokidar = require('chokidar') //to detect file changes inside a directory,file deleted or created
const program = require('caporal')   //build our CLI Tool,parse,arguement with filename
const debounce = require('lodash.debounce')  // to stop add function for calling for certain time,loadh is millions of functions package
const {spawn} = require('child_process')   //execute a program ,spawn- return a object of child-processes
const fs=require('fs')   //for access in file system
const chalk = require('chalk')

program
.version('0.0.1')
.argument('[filename]','Name of a file to exceute')
.action(async({filename})=>{   //args is object of  arguements
    const name=filename || 'index.js';

    try{
    await fs.promises.access(name)  //access-whether a file exist or not
    }catch(err){
     throw new Error(`Could not find a file ${name}`)
    }

    let proc;
    const start=debounce(()=>{
        if(proc){
            proc.kill();  //to kill the existing process after change in certian time interval
        }
        console.log(chalk.blue('>>>>> Starting process...'));
       proc= spawn('node',[name],{stdio:'inherit'})  //standard io(stdio)-converts child process(stdin.stdout,stderr) to process than process convers info to terminal

    },100)
    
    chokidar.watch('.')
        // .on('add',()=>console.log('STARTED USER PROGRAM'))  //create a new file or sees files for first time, chokidar sees all new file in project directory 
        .on('add',start)
        .on('change',start)   //change a file and change when file code changes 
        .on('unlink',start)  //deleting a file

});

program.parse(process.argv)

