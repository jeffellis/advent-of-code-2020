#!/usr/bin/env node

const readlines = require('n-readlines');

const lineReader = new readlines('./input.txt');

const main = () => {
    let buffer;
    let validPasswords = 0;

    while (buffer = lineReader.next()) {
        const entry = parseLine(buffer.toString());
        if (isValid(entry)) {
            validPasswords += isValid(entry) ? 1 : 0;
            console.log(`Valid: ${buffer.toString()}`);
        }
    }
    
    console.log(`\n\nThere are ${validPasswords} valid passwords`);
}

const parseLine = (line) => {
    const [minMax, letter, password] = line.split(' ');
    const [minOccurences, maxOccurences] = minMax.split('-');
    return {
        letter: letter.replace(':', ''),
        minOccurences,
        maxOccurences,
        password
    };
}

const isValid = (entry) => {
    const occurences = getOccurences(entry.letter, entry.password);
    return occurences >= entry.minOccurences && occurences <= entry.maxOccurences;
}

const getOccurences = (letter, string) => {
    let count = 0;
    for (let position = 0; position < string.length; position++) {
        if (string.charAt(position) == letter) {
            count += 1;
        }
    }
  return count;
}

main();

