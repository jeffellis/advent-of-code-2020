#!/usr/bin/env node

const readlines = require('n-readlines');

const lineReader = new readlines('./input.txt');

const PREAMBLE_LENGTH = 25;

const data = [];
const factors = [];

// Keep a parallel map of factors for more efficient lookup of differences
const factorMap = {}; 

const main = () => {
    
    parseInput();
    
    const encodingError = findError();
    const weakness = findWeakness(encodingError);

    console.log(`\n\nEncoding error: ${encodingError}`);
    console.log(`\n\nEncoding weakness: ${weakness}`);
}

const findError = () => {
    let index = PREAMBLE_LENGTH;
    while (index < data.length) {
        const value = data[index];
        for (let j = 0; j < factors.length; j++) {
            const difference = value - factors[j];
            // console.log(`value: ${value} -- looking for ${difference} in `, factors);
            if (factorMap[difference] === difference) {
                // found the second factor, update the list of factors and move to the next value
                delete factorMap[factors.shift()];
                factors.push(value);
                factorMap[value] = value;
                break;
            }
            if (j === factors.length - 1) {
                return value;
            }
        }
        index++;
    }
    return -1;
}

const findWeakness = (encodingError) => {
    let dataIndex = 0;
    let weakness = null;
    while (dataIndex < data.length && weakness === null) {
        let sumWindow = [data[dataIndex]];
        let sum = data[dataIndex];
        for (let i = 1; sum < encodingError; i++ ) {
            const nextValue = data[dataIndex+i];
            sumWindow.push(nextValue);
            sum += nextValue;
            if (sum === encodingError) {
                weakness = Math.min(...sumWindow) + Math.max(...sumWindow);
            }
        }
        dataIndex++
    }
    return weakness;
}

const parseInput = () => {
    let buffer;
    let index = 0;
    while (buffer = lineReader.next()) {
        const value = Number.parseInt(buffer.toString());
        data.push(value);
        if (index < PREAMBLE_LENGTH) {
            factors.push(value);
            factorMap[value] = value;
        }
        index++;
    }
}

main();

