#!/usr/bin/env node

const { iteratee } = require('lodash');
const readlines = require('n-readlines');

const lineReader = new readlines('./input.txt');

const adapters = [0];

const main = () => {
    let buffer;
    const differences = {
        1: 0, 
        3: 0,
    };

    while (buffer = lineReader.next()) {
        adapters.push(Number.parseInt(buffer.toString()));        
    }
    adapters.sort((a, b) => a - b);
    adapters.push(adapters[adapters.length - 1] + 3); // device itself;
    console.log(adapters);

    part1();
    part2();
}

const part1 = () => {
    const differences = {
        1: 0, 
        3: 0,
    };

    for (let i = 1; i < adapters.length; i++) {
        const difference = adapters[i] - adapters[i-1];
        differences[difference] = differences[difference] ? differences[difference] + 1 : 1;
    }
    console.log(differences);

    console.log(`\n\nPart1 -- Differences: `, differences);
    console.log(`\n\nPart1 -- Answer: ${differences[1] * differences[3]}`);

}

const paths = {}

let recursiveIterations = 0;
const part2 = () => {
    const chains = [];
    buildTree();
    // console.log(paths)

    const combinations = pathsForward(0);

    console.log(paths);

    console.log(`Part2 -- combinations: ${combinations}`);
    console.log(`Part2 -- Recursive Iterations: ${recursiveIterations}`);
}

const buildTree = () => {
    adapters.forEach((adapter, index) => {
        paths[adapter] = nextPaths(index);
    });
}

// Find the possibilities for the next adapter in the chain from
// the adapter at index (there can be at most 3)
const nextPaths = (index) => {
    let nextNodes = [];
    for (let j = 1; 
        j <= 3 && index + j < adapters.length && adapters[index + j] - adapters[index] <= 3; 
        j++) {            
            nextNodes.push(adapters[index+j])
    }
    return { nextNodes };
}

const pathsForward = (adapter) => {
    recursiveIterations++;
    const node = paths[adapter];

    // Optimization:
    // Caching the calculated paths drops the number of recursive iterations 
    // to 57 from 76217 for input1.txt. Iterations for input.txt are 177 with
    // the cache.

    if (node.paths) {
        return node.paths;
    }

    const childPaths = node.nextNodes.reduce((acc, next) => {
       const nextNode = paths[next];
       return acc + pathsForward(next);
    }, 0);

    
    const result = node.nextNodes.length > 0 ? childPaths : 1;
    node.paths = result;
    // console.log(`returning: ${result} for node `, adapter);
    return result;
}

main();
