#!/usr/bin/env node

const readlines = require('n-readlines');

const lineReader = new readlines('./input.txt');

const main = () => {
    let buffer, line, numberInGroup = 0;
    const groupAnswers = new Map();
    let sum = 0;

    while (buffer = lineReader.next()) {
        line = buffer.toString();
        if (line.length === 0) {
            let groupSum = 0;
            groupAnswers.forEach((value, key) => {
                groupSum += value === numberInGroup ? 1 : 0;
            });
            sum += groupSum;
            console.log(`found group. members = ${numberInGroup} groupSum = ${groupSum} total = ${sum}`);
            groupAnswers.clear();
            numberInGroup = 0;
        } else {
            for (char of line) {
                groupAnswers.set(char, groupAnswers.get(char) ? groupAnswers.get(char) + 1 : 1);
            }
            numberInGroup++;
        }

    }
    // Finish the last group if the file doesn't end in newline.
    if (line.length > 0) {
        let groupSum = 0;
        groupAnswers.forEach((value, key) => {
            groupSum += value === numberInGroup ? 1 : 0;
        });
        sum += groupSum;
        console.log(`found group. members = ${numberInGroup} groupSum = ${groupSum} total = ${sum}`);
        groupAnswers.clear();
        numberInGroup = 0;
    }

    console.log(`\n\nFinal sum: ${sum}`);
}

const calculateGroupSum = (groupAnswers) => {
}

main();

