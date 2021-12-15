#!/usr/bin/env node

const chokidar = require('chokidar') //to detect file changes inside a directory,file deleted or created
const program = require('caporal')   //build our CLI Tool,parse,arguement with filename
const debounce = require('lodash.debounce')  // to stop add function for calling for certain time,loadh is millions of functions package
// const childProcess = require('child_process')   //execute a program

program
.version('0.0.1')
.argument('[filename','Name of a file to exceute')
.action((args)=>{   //args is object of  arguements
 console.log(args);
})

const start=debounce(()=>{
    console.log('starting user program');
},100)

chokidar.watch('.')
    // .on('add',()=>console.log('STARTED USER PROGRAM'))  //create a new file or sees files for first time, chokidar sees all new file in project directory 
    .on('add',start)
    .on('change',()=>console.log('CHANGE'))   //change a file and change when file code changes 
    .on('unlink',()=>console.log('UNLINKED'))  //deleting a file
