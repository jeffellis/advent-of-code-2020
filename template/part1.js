#!/usr/bin/env node

const readlines = require('n-readlines');

const lineReader = new readlines('./input1.txt');

const main = () => {
    let buffer;

    while (buffer = lineReader.next()) {
        const line = parseLine(buffer.toString());
        
    }
    
    console.log(`\n\nOutput goes here`);
}

const parseLine = (line) => {
    // TODO do something with line
}

main();

