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
    const [position1, position2] = minMax.split('-');
    return {
        letter: letter.replace(':', ''),
        position1: position1 - 1,
        position2: position2 - 1,
        password
    };
}

const isValid = ({letter, password, position1, position2}) => {
    return (
        (password.charAt(position1) === letter || password.charAt(position2) === letter) &&
        password.charAt(position1) !== password.charAt(position2)
    );
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

