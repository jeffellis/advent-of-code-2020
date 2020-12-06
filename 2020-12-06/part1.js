#!/usr/bin/env node

const readlines = require('n-readlines');

const lineReader = new readlines('./input.txt');

const main = () => {
    let buffer, line;
    const groupAnswers = new Set();
    let sum = 0;

    while (buffer = lineReader.next()) {
        // console.log(`'${buffer.toString()}'`);
        line = buffer.toString();
        if (line.length === 0) {
            console.log(`found group. Answers = ${groupAnswers.size}`);
            sum += groupAnswers.size;
            groupAnswers.clear();
        } else {
            for (char of line) {
                groupAnswers.add(char);
            }
        }

    }
    // Finish the last group if the file doesn't end in newline.
    if (line.length > 0) {
        sum += groupAnswers.size;
        groupAnswers.clear();
    }

    console.log(`\n\nFinal sum: ${sum}`);
}

const parseLine = (line) => {
    // TODO do something with line
}

main();

