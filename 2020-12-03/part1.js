#!/usr/bin/env node

const readlines = require('n-readlines');

const lineReader = new readlines('./input.txt');

const TREE = '#';
const OPEN = '.';

const RISE = 1;
const RUN = 3;

const inputForest = [];
const forest = [];

const main = () => {
    let trees = 0, x = RUN, y = RISE;

    parseFile();

    while (y < forest.length) {
        if (x >= forest[0].length) {
            expandForest();
        }

        trees += forest[y].charAt(x) === TREE ? 1 : 0;

        x += RUN;
        y += RISE;
    }

    console.log(`\n\nTrees Encountered = ${trees}`);
}

const parseFile = () => {
    let buffer;
    while (buffer = lineReader.next()) {
        inputForest.push(buffer.toString());
        forest.push(buffer.toString());        
    }
}

const expandForest = () => {
    inputForest.forEach((row, index) => {
        forest[index] = forest[index].concat(row);
    })
}

main();

