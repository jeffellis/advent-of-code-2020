#!/usr/bin/env node

const readlines = require('n-readlines');

const lineReader = new readlines('./input.txt');

const TREE = '#';
const OPEN = '.';

const inputForest = [];
const forest = [];

const main = () => {
    parseFile();

    const slopes = [
        { run: 1, rise: 1},
        { run: 3, rise: 1},
        { run: 5, rise: 1},
        { run: 7, rise: 1},
        { run: 1, rise: 2},
    ]

    const trees = slopes.map((slope) => treesEncountered(slope));
    console.log(`\n\nTrees Encountered = ${trees}`);

    const result = trees.reduce((acc, current) => acc * current);
    console.log(`\n\nResult is: ${result}`);
}

const treesEncountered = ({run, rise}) => {
    let trees = 0, x = run, y = rise;

    while (y < forest.length) {
        if (x >= forest[0].length) {
            expandForest();
        }

        trees += forest[y].charAt(x) === TREE ? 1 : 0;

        x += run;
        y += rise;
    }

    return trees;
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

